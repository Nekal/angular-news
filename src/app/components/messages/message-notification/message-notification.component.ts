import { Component, OnInit } from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-message-notification',
  templateUrl: 'message-notification.component.html',
  styleUrls: ['message-notification.component.css']
})

export class MessageNotificationComponent implements OnInit {
  newMessage = false;
  connection;
  userData;

  constructor(private messageService: MessageService, private userService: UserService) {
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }
  ngOnInit() {
    this.connection = this.messageService.getMessages(this.userData.id).subscribe((message: Message) => {
      this.newMessage = true;
      setTimeout(() => this.newMessage = false, 5000);
    });
  }
}
