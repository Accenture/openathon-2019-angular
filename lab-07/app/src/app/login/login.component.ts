import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../core/user.service";
import { User } from "../models/user";

@Component({
  selector: 'oevents-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msgs: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: "",
      password: ""
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      console.log(res)
      if(res.email) {
        this.router.navigate(["/events"]);
      } else {
        this.msgs = res;
      }
    }, err => this.msgs = 'Email not found.')
  }

}
