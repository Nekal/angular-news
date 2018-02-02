import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-news-header',
  templateUrl: 'news-header.component.html',
  styleUrls: ['news-header.component.css']
})

export class NewsHeaderComponent implements OnInit {
  userData: User = new User();
  constructor(private userService: UserService) {
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }
  ngOnInit() {}
}
