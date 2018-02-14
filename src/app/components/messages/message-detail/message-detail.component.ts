import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesFormComponent} from '../message-form/messages-form.component';

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

  constructor(private messageService: MessageService, private modalService: NgbModal) {}

  ngOnInit() {
    this.doGetNews();
  }
  doGetNews() {
    this.messageService.getMessage(this.messageId)
      .subscribe(message => {
        this.message = message;
        this.doViewedMessage();
      });
  }
  open() {
    const modalRef = this.modalService.open(MessagesFormComponent);
    modalRef.componentInstance.recipientId = this.message.userId;
  }
  doViewedMessage() {
    console.log(this.message.status === 'new');
    if (this.message.status === 'new') {
      this.messageService.viewedMessage(this.messageId, 'viewed');
    }
  }
}
