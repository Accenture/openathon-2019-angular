import { Component, OnDestroy } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../core/user.service";
import { Router } from "@angular/router";
import { SubscriptionLike } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as login from '../store/login/login.actions';

@Component({
  selector: 'oevents-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  user: User;
  isAuthenticated: boolean;
  subscriptionLogin: SubscriptionLike;

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<any>
  ) {
    this.subscriptionLogin = store.pipe(select('login')).subscribe(state => {
      if (state) {
        this.isAuthenticated = state.logged;

        if(this.isAuthenticated) {
          this.user = JSON.parse(localStorage.getItem("user"));
        }
      }
    })
   }

  logout() {
    this.userService.logout();
    this.store.dispatch(new login.Logged(false));
    this.router.navigate(["/home"]);
  }

  ngOnDestroy() {
    this.subscriptionLogin.unsubscribe()
  }
}
