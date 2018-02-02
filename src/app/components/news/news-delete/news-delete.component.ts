import {Component, Input, OnInit} from '@angular/core';
import { News } from '../../../models/News';
import {NewsService} from '../../../services/news.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';

@Component({
  moduleId: module.id,
  selector: 'app-news-delete',
  templateUrl: 'news-delete.component.html',
  styleUrls: ['news-delete.component.css']
})

export class NewsDeleteComponent implements OnInit {
  news: News;
  userToken: string;
  userData: User;
  @Input() id: number;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private router: Router,
  ) {
    this.userToken = this.userService.getUserToken();
    this.userData = this.userService.getUserData();
  }

  ngOnInit() {}
  doDeleteNews() {
    this.newsService.deleteNews(this.userToken, this.id, this.userData.id)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
