import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignUpComponent implements OnInit {
  user: User = new User();
  userData: User = null;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.doGetUserData();
  }
  doGetUserData() {
    this.userData = this.userService.getUserData();
  }
  doSignUp() {
    this.userService.signUp(this.user.username, this.user.email, this.user.password)
      .subscribe(() => {
        this.router.navigate(['/signin']);
      });
  }
}
