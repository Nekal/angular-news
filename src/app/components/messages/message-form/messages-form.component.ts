import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Message} from '../../../models/Message';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages-form.component.html',
  styleUrls: ['messages-form.component.css']
})

export class MessagesFormComponent implements OnInit {
  @Input() recipientId: number;
  message = new Message();
  userToken: string;
  userData: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }
  ngOnInit() {}
  doSend() {
    this.messageService.sendSocketMessage(
      this.message,
      this.userData.id,
      this.recipientId);
    this.activeModal.close('Close click');
  }
}
