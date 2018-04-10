import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-user-dropdown',
  templateUrl: 'user-dropdown.component.html',
  styleUrls: ['user-dropdown.component.css']
})

export class UserDropdownComponent {
  userToken: string;
  userData: User;

  constructor(private userService: UserService, private router: Router) {
    this.userToken = this.userService.getUserToken();
    const user = this.userService.getUserData();
    if (user) {
      this.userData = user;
    }
  }

  doLogout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }
}
