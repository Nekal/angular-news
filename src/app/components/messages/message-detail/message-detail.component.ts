import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';

@Component({
  moduleId: module.id,
  selector: 'app-message-detail',
  templateUrl: 'message-detail.component.html',
  styleUrls: ['message-detail.component.css']
})

export class MessageDetailComponent implements OnInit {
  @Input() messageId: number;
  message: Message = new Message();
  userData: User = new User();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.doGetNews();
  }
  doGetNews() {
    this.messageService.getMessage(this.messageId)
      .subscribe(data => {
        this.message = data;
      });
  }
}
