import { Component, DoCheck } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../core/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'oevents-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements DoCheck {
  user: User;
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngDoCheck() {
    this.checkUser();
  }

  checkUser() {
    this.isAuthenticated = this.userService.checkUser();
    if(this.isAuthenticated) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }

  logout() {
    this.userService.logout();
    this.isAuthenticated = false;
    this.router.navigate(["/home"]);
  }

}
