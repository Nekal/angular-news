import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit {
  userData: User;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        this.userData = this.userService.getUserData();
      });
  }
  doLogout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }
}
