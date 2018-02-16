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
  viewActiveMessage = false;
  // connection;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
    this.doGetAllMessages();
  }
  ngOnInit() {
    // this.connection = this.messageService.getMessages(this.userData.id)
    //   .subscribe((data: any) => {
    //     if (typeof data === 'number' && this.messages) {
    //       console.log('status');
    //       const item = this.messages.find((message) => message.id === data);
    //       if (item) {
    //         item.status = 'viewed';
    //       }
    //     } else {
    //       console.log(data);
    //       this.messages.unshift(data);
    //     }
    // });
  }
  doGetAllMessages() {
    this.messageService.getAllMessages(this.userToken, this.userData.id)
      .subscribe(data => {
        console.log(data);
        this.messages = data;
      });
  }
  viewMessage(id: number) {
    console.log(id);
    this.senderId = id;
    this.viewActiveMessage = true;
  }
  ngOnDestroy() {
    // this.connection.unsubscribe();
  }
}
