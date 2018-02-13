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
    this.playAudio();
    this.userData = this.userService.getUserData();
    this.connection = this.messageService.getMessages(this.userData.id)
      .subscribe((message: Message) => {
        this.messages.unshift(message);
        this.onAudioPlay();
      });
  }
  doLogout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }
  playAudio() {
    const audio = new Audio();
    audio.src = './message.mp3';
    audio.load();
    audio.play();
  }
}
