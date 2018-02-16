import {Component, Input, OnInit} from '@angular/core';
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
  messages: Message[] = [];
  userToken: string;
  userData: User;
  sendMessage: Message = new Message();
  connection;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }

  ngOnInit() {
    this.doGetChatMessages();
    this.connection = this.messageService.getMessages(this.userData.id)
      .subscribe((data: any) => {
        console.log(data);
        if (typeof data === 'object') {
          console.log(data);
          this.messages.push(data);
        }
      });
  }
  doGetChatMessages() {
    this.messageService.getChatMessages(this.userToken, this.userData.id, this.senderId)
      .subscribe(messages => {
        this.messages = messages;
        // this.doViewedMessage();
      });
  }
  doSend() {
    this.messageService.sendSocketMessage(
      this.sendMessage,
      this.userData.id,
      this.senderId);
  }
}
