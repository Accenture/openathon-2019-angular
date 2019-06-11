import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../core/user.service";

@Component({
  selector: 'oevents-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: "",
      password: ""
    });
  }

  onSubmit() {
    this.user = this.signupForm.value;

    this.userService.signup(this.user).subscribe((event: Event) => {
      this.router.navigate(["/events"]);
    });
  }

}
