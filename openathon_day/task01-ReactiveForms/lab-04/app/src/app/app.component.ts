import { Component, OnInit } from "@angular/core";
import users from "../../../users.json";
import { UserDataService } from "./core/user-data.service";

@Component({
  selector: "oevents-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(userData: UserDataService) {
    users.users.forEach((userInfo) => {
      userData.userArray.push(userInfo);
    });
  }
  title = "open-events-front";
  ngOnInit(): void {}
}
