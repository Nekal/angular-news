import { Component, OnInit } from '@angular/core';
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

export class MyMessagesComponent implements OnInit {
  messages: Message[];
  userToken: string;
  userData: User;
  activeMessageId: number;
  viewActiveMessage = false;
  connection;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
    this.doGetAllMessages();
  }
  ngOnInit() {
    this.connection = this.messageService.getMessages(this.userData.id).subscribe((message: Message) => {
      this.messages.push(message);
    });
  }
  doGetAllMessages() {
    this.messageService.getAllMessages(this.userToken, this.userData.id)
      .subscribe(data => {
        console.log(data);
        this.messages = data;
      });
  }
  viewMessage(id: number) {
    this.activeMessageId = id;
    this.viewActiveMessage = true;
  }
}
