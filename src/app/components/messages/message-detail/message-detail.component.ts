import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {User} from '../../../models/User';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-message-detail',
  templateUrl: 'message-detail.component.html',
  styleUrls: ['message-detail.component.css']
})

export class MessageDetailComponent implements OnInit {
  @Input() senderId: number;
  @ViewChild('chatScroll') chatScroll: ElementRef;
  messages: Message[] = [];
  userToken: string;
  userData: User;
  sendMessage: Message = new Message();
  connection;
  count;
  loading = false;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }

  ngOnInit() {
    this.doGetChatMessages();
    this.chatActionListener();
    this.viewedMessage();
  }
  chatActionListener() {
    this.connection = this.messageService.getMessages(this.userData.id)
      .subscribe((data: any) => {
        this.messages.push(data);
        this.viewedMessage();
        setTimeout(() => this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight, 50);
      });
  }
  doGetChatMessages() {
    this.messageService.getChatMessages(this.userToken, this.userData.id, this.senderId)
      .subscribe(messages => {
        this.messages = messages;
        this.count = this.messages.length - 10;
        setTimeout(() => this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight, 1);
        this.viewedMessage();
      });
  }
  doSend () {
    this.messageService.sendSocketMessage(
      this.sendMessage,
      this.userData.id,
      this.senderId);
    this.sendMessage.content = '';
    setTimeout(() => this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight, 50);
  }
  viewedMessage () {
    this.messageService.viewedMessage(this.senderId, this.userData.id, 'viewed');
  }
  onScrollUp () {
    this.loading = true;
    this.count -= 10;
    setTimeout(() => this.loading = false, 70000);
  }
}
