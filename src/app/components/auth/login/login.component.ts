import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  user: User = new User();
  userData: User = null;

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.doGetUserData();
  }
  doGetUserData() {
    this.userData = this.userService.getUserData();
  }
  doGetToken(username: string, password: string) {
    this.userService.getToken(username, password).subscribe(token => {
      this.userService.setUserToken(token);
    });
  }
  doSignIn() {
    this.userService.signIn(this.user.username, this.user.password)
      .subscribe(data => {
        if (data.username !== undefined) {
          this.doGetToken(this.user.username, this.user.password);
          this.userService.setUserData(data);
          this.router.navigate(['/']);
        }
      });
  }
}
