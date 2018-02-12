import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiService } from './api.service';
import {News} from '../models/News';

@Injectable()
export class UserService {
  private USER_DATA_KEY = 'user_data';
  private TOKEN_KEY = 'token';
  private signUpUrl = '/api/signup';
  private signInUrl = '/api/signin';
  private getTokenUrl = '/api/token';
  private profileUrl = '/api/profile';

  constructor(private apiService: ApiService) {}
  signUp(username: string, email: string, password: string): Observable<any> {
    const _bodyData: any = {};
    _bodyData['username'] = username;
    _bodyData['email'] = email;
    _bodyData['password'] = password;
    _bodyData['role'] = 'user';

    return this.apiService.perform('post', this.signUpUrl, _bodyData);
  }
  signIn(username: string, password: string): Observable<any> {
    const _params: any = {};
    _params['username'] = username;
    _params['password'] = password;

    return this.apiService.perform('get', this.signInUrl, {}, _params);
  }
  getToken(username: string, password: string) {
    const _params: any = {};
    _params['username'] = username;
    _params['password'] = password;

    return this.apiService.perform('get', this.getTokenUrl, {}, _params);
  }
  setUserToken(token: string) {
    if (token) {
      window.localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    }
  }
  logout() {
    window.localStorage.removeItem(this.USER_DATA_KEY);
    window.localStorage.removeItem(this.TOKEN_KEY);
  }
  getProfile(id: number): Observable<any> {
    const _params: any = {};
    _params['id'] = id;

    return this.apiService.perform('get', this.profileUrl, {}, _params);
  }
  getUserToken(): any {
    return JSON.parse(window.localStorage.getItem(this.TOKEN_KEY));
  }
  setUserData(user: any) {
    if (user) {
      window.localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    }
  }
  getUserData(): any {
    return JSON.parse(window.localStorage.getItem(this.USER_DATA_KEY));
  }
}
