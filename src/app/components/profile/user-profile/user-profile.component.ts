import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/User';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessagesFormComponent} from '../../messages/message-form/messages-form.component';

@Component({
  moduleId: module.id,
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  profile: User = new User();
  profileId: number;
  userData: User;
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {}
  ngOnInit() {
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
    this.userService.getProfile(Number(this.route.snapshot.url[1].path))
      .subscribe(data => {
        this.profile = data;
      });
  }
  open() {
    const modalRef = this.modalService.open(MessagesFormComponent);
    modalRef.componentInstance.recipientId = Number(this.route.snapshot.url[1].path);
  }
}
