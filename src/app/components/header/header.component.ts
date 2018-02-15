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
  connection;
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
    this.connection = this.messageService.getMessages(this.userData.id)
      .subscribe((data: any) => {
        if (typeof data === 'number' && this.messages !== undefined) {
          this.messages.splice(
            this.messages.indexOf(this.messages.find((message) => message.id === data)),
            1
          );
        } else {
          this.messages.unshift(data);
        }
        this.onAudioPlay();
      });
  }
  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
