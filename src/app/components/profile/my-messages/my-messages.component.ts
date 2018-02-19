import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {Message} from '../../../models/Message';

@Component({
  moduleId: module.id,
  selector: 'app-my-messages',
  templateUrl: 'my-messages.component.html',
  styleUrls: ['my-messages.component.css']
})

export class MyMessagesComponent implements OnInit, OnDestroy {
  messages: Message[];
  userToken: string;
  userData: User;
  senderId: number;
  activeChat = false;
  activeMessageSubscribe;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) { this.userData = user; }
    this.doGetAllMessages();
  }
  ngOnInit() {
    this.activeMessageSubscribe = this.messageService.getMessages(this.userData.id)
      .subscribe((data: any) => {
        const messageIndex = this.messages.indexOf(this.messages.find((message) => message.userId === data.userId));
        if (messageIndex !== -1) { this.messages[messageIndex] = data; }
    });
  }
  doGetAllMessages() {
    this.messageService.getAllMessages(this.userToken, this.userData.id)
      .subscribe(data => {
        this.messages = data;
      });
  }
  viewMessage(id: number) {
    console.log(id);
    this.senderId = id;
    this.activeChat = true;
  }
  ngOnDestroy() {
    this.activeMessageSubscribe.unsubscribe();
  }
}
