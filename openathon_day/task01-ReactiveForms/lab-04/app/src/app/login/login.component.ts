import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserDataService } from "../core/user-data.service";
import { validationMessages } from "../../environments/environment";
import { initializeUser } from "../models/user";

@Component({
  selector: "oevents-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErr: Object = {};
  userService: UserDataService;
  unSuccessLogin: boolean = false;
  constructor(userData: UserDataService) {
    this.userService = userData;
    this.loginFormErr = initializeUser();
    this.loginForm = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    console.log(this.loginFormErr);
  }

  onValueChanged(changes?: any) {
    if (!this.loginForm) {
      return;
    }
    this.unSuccessLogin = false;
    const form = this.loginForm;
    for (const field in this.loginFormErr) {
      //We are not using date property, wich is a Date type object, so, we will use
      //try catch method until we decide what we should do with the date property
      this.loginFormErr[field] = "";
      const control = form.get(field);
      if (control && control.touched && !control.valid) {
        for (const key in validationMessages) {
          let completeKey: string = String(key);
          let success: boolean = true;
          if (completeKey.indexOf("length") !== -1) {
            if (control.hasError("minlength")) {
              success = false;
            } else if (control.hasError("maxlength")) {
              success = false;
            }
          } else {
            if (control.hasError(completeKey)) {
              success = false;
            }
          }
          if (!success) {
            this.loginFormErr[field] = validationMessages[key];
          }
        }
      }
    }
  }

  userLogin() {
    if (!this.loginForm) {
      return;
    }
    this.userService.logIn({
      name: this.loginForm.get("name").value,
      password: this.loginForm.get("password").value,
    });
  }

  ngOnInit() {}
}
