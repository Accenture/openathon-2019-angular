import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "../core/user.service";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private userService: UserService
  ) {}

  canActivate(): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if(this.userService.checkUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
