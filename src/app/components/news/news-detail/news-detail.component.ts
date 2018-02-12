import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/News';
import { NewsService } from '../../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-news-detail',
  templateUrl: 'news-detail.component.html',
  styleUrls: ['news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {
  news: News = new News();
  userData: User = new User();

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.doGetNews(Number(params.id)));
  }
  doGetNews(id: number) {
    this.newsService.getNews(id).subscribe(news => {
      this.news = news;
      console.log(this.userData.id === this.news.userId);
    });
  }
}
