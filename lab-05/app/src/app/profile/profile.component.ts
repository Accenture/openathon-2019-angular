import { Component, OnInit } from '@angular/core';
import { UserService } from "../core/user.service";
import { User } from '../models/user';


@Component({
  selector: 'oevents-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

}
