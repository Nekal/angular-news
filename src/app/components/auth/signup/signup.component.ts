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
  isError = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.doGetUserData();
  }
  doGetUserData() {
    this.userData = this.userService.getUserData();
  }
  doSignUp() {
    this.isError = false;
    this.errorMessage = '';
    this.userService.signUp(this.user.username, this.user.email, this.user.password)
      .subscribe((data) => {
         if(data.errors){
           this.isError = true;
           this.errorMessage = data.errors[0].message;
         } else {
           this.router.navigate(['/signin']);
         }
      });
  }
}
