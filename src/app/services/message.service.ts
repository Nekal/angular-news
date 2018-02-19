import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiService } from './api.service';
import * as io from 'socket.io-client';
import {Message} from '../models/Message';

@Injectable()
export class MessageService {
  private url = 'http://localhost:8000';
  private sendMessages = 'api/send';
  private newMessages = 'api/new';
  private messagesUrl = 'api/messages';
  private messageUrl = 'api/message';
  private socket = io(this.url);
  private chatMessages = 'api/chatmessage';
  constructor(private apiService: ApiService) {}
  getMessage(id: number): Observable<any> {
    const _params: any = {};
    _params['id'] = id;

    return this.apiService.perform('get', this.messageUrl, {}, _params);
  }
  getChatMessages(token: string, userId: number, recipientId: number): Observable<any> {
    const _params: any = {};
    _params['token'] = token;
    _params['userId'] = userId;
    _params['recipientId'] = recipientId;

    return this.apiService.perform('get', this.chatMessages, {}, _params);
  }
  doGetNewMessages(userId: number, status: string) {
    const _params: any = {};
    _params['userId'] = userId;
    _params['status'] = status;

    return this.apiService.perform('get', this.newMessages, {}, _params);
  }
  viewedMessage(userId: number, recipientId: number, status: string) {
    this.socket.emit('view-message', userId, recipientId, status);
  }
  getAllMessages(token, userId): Observable<any> {
    const _params: any = {};
    _params['token'] = token;
    _params['userId'] = userId;

    return this.apiService.perform('get', this.messagesUrl, {}, _params);
  }
  sendSocketMessage(message: Message, userId: number, recipientId: number) {
    this.socket.emit('send-message', message.content, userId, recipientId);
  }
  // getChatSubscribe(recipientId) {
  //   const observable = new Observable(observer => {
  //     this.socket = io(this.url);
  //     this.socket.on('message/' + recipientId, (data: Message) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }
  getViewedMessageSubscribe() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('viewedMessage', (data: number) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getMessages(id) {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message/' + id, (data: Message) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
