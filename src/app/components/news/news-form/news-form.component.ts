import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/News';
import {ActiveNews, NewsService} from '../../../services/news.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';

@Component({
  moduleId: module.id,
  selector: 'app-news-form',
  templateUrl: 'news-form.component.html',
  styleUrls: ['news-form.component.css']
})

export class NewsFormComponent implements OnInit {
  news: News;
  userToken: string;
  userData: User;
  action: string;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.news = new News();
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url[0].path === 'edit') {
      this.action = 'edit';
      this.route.params.subscribe(params => this.doGetNews(Number(params.id)));
    } else {
      this.action = 'create';
    }
  }
  doGetNews(id: number) {
    this.newsService.getNews(id).subscribe(news => {
      this.news = news;
    });
  }
  doCreateNews() {
    this.newsService.createNews(this.userToken, this.news.title, this.news.description, this.userData.id)
      .subscribe((data) => {
        ActiveNews.setActiveNewsId(data.id);
        this.router.navigate(['/']);
      });
  }
  doEditNews() {
    this.newsService.editNews(this.userToken, this.news.id, this.news.title, this.news.description, this.news.userId)
      .subscribe(() => {
        ActiveNews.setActiveNewsId(this.news.id);
        this.router.navigate(['/']);
      });
  }
}
