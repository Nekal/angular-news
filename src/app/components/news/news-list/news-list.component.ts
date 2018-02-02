import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/News';
import {ActiveNews, NewsService} from '../../../services/news.service';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-news-list',
  templateUrl: 'news-list.component.html',
  styleUrls: ['news-list.component.css']
})

export class NewsListComponent implements OnInit {
  news: News[];
  activeNewsId: number;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.doGetAllNews();
    this.doGetActiveNews();
  }
  doGetAllNews() {
    this.newsService.getAllNews().subscribe(news => {
      this.news = news;
    });
  }
  doGetActiveNews() {
    const data = ActiveNews.getActiveNewsId();
    if (data) {
      this.activeNewsId = data;
    }
  }
}
