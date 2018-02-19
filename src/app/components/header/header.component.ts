import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Howl} from 'howler';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/Message';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userData: User;
  subscribeMessage;
  subscribeViewedMessage;
  messages: Message[] = [];
  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.userData = this.userService.getUserData();
      });
  }
  ngOnInit() {
    this.userData = this.userService.getUserData();
    this.doGetNewMessages();
    this.subscribeMessages();
    this.subscribeViewedMessages();
  }
  doGetNewMessages() {
    this.messageService.doGetNewMessages(this.userData.id, 'new')
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
  doLogout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }
  subscribeMessages() {
    this.subscribeMessage = this.messageService.getMessages(this.userData.id)
      .subscribe((data: any) => {
        if (data.recipientId === this.userData.id) {
          this.messages.unshift(data);
          this.onAudioPlay();
        }
      });
  }
  subscribeViewedMessages() {
    this.subscribeMessage = this.messageService.getViewedMessageSubscribe()
      .subscribe(() => {
        this.doGetNewMessages();
      });
  }
  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }
  ngOnDestroy() {
    this.subscribeMessage.unsubscribe();
  }
}
