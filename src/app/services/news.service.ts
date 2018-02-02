import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiService } from './api.service';
import {News} from '../models/News';

export class ActiveNews {
  private static activeNewsId: number;
  static setActiveNewsId(id: number) {
    this.activeNewsId = id;
  }
  static getActiveNewsId(): number {
    return this.activeNewsId;
  }
  static clearActiveNewsId() {
    this.activeNewsId = null;
  }
}

@Injectable()
export class NewsService {
  private allNewsUrl = 'api/allnews';
  private addNewsUrl = 'api/add';
  private newsUrl = 'api/news';

  constructor(private apiService: ApiService) {}
  getAllNews(): Observable<any> {
    return this.apiService.perform('get', this.allNewsUrl);
  }
  getNews(id): Observable<any> {
    const _params: any = {};
    _params['id'] = id;

    return this.apiService.perform('get', this.newsUrl, {}, _params);
  }
  deleteNews(token: string, id: number, userId: number): Observable<any> {
    const _params: any = {};
    _params['token'] = token;
    _params['id'] = id;
    _params['userId'] = userId;

    return this.apiService.perform('delete', this.newsUrl, {}, _params);
  }
  createNews(token: string, title: string, description: string, userId: number) {
    const _bodyData: any = {};
    _bodyData['token'] = token;
    _bodyData['title'] = title;
    _bodyData['description'] = description;
    _bodyData['userId'] = userId;

    return this.apiService.perform('post', this.addNewsUrl, _bodyData);
  }
  editNews(token: string, id: number, title: string, description: string, userId: number) {
    const _bodyData: any = {};
    _bodyData['token'] = token;
    _bodyData['id'] = id;
    _bodyData['title'] = title;
    _bodyData['description'] = description;
    _bodyData['userId'] = userId;

    return this.apiService.perform('put', this.newsUrl, _bodyData);
  }
}
