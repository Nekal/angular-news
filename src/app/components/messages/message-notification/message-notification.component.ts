import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-message-notification',
  templateUrl: 'message-notification.component.html',
  styleUrls: ['message-notification.component.css']
})

export class MessageNotificationComponent implements OnInit, OnDestroy {
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
    this.connection = this.messageService.getMessages(this.userData.id)
      .subscribe((data) => {
        if (typeof data !== 'number') {
          this.newMessage = true;
          setTimeout(() => this.newMessage = false, 5000);
        }
      });
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
