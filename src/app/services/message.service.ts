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
  private messagesUrl = 'api/messages';
  private messageUrl = 'api/message';
  private socket = io(this.url);

  constructor(private apiService: ApiService) {}
  getMessage(id: number): Observable<any> {
    const _params: any = {};
    _params['id'] = id;

    return this.apiService.perform('get', this.messageUrl, {}, _params);
  }
  getAllMessages(token, userId): Observable<any> {
    const _params: any = {};
    _params['token'] = token;
    _params['userId'] = userId;

    return this.apiService.perform('get', this.messagesUrl, {}, _params);
  }
  sendSocketMessage(message: Message, userId: number, recipientId: number) {
    this.socket.emit('send-message', message.title, message.content, userId, recipientId);
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
  sendMessage(token: string, message: Message, userId: number, recipientId: number) {
    const _bodyData: any = {};
    _bodyData['token'] = token;
    _bodyData['title'] = message.title;
    _bodyData['content'] = message.content;
    _bodyData['userId'] = userId;
    _bodyData['recipientId'] = recipientId;

    return this.apiService.perform('post', this.sendMessages, _bodyData);
  }
}
