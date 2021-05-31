import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  userArray: User[] = new Array();
  http: HttpClient;
  route: Router;
  constructor(http: HttpClient, route: Router) {
    this.http = http;
    this.route = route;
  }
  logIn(user: {}) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    console.log(user);
    return this.http
      .get(
        environment.apiURL + "users",
        { headers }
      ).pipe()
      // .subscribe((users: any) =>{
      //   console.log(users);
      // })
      // .pipe(
      //   retry(3),
      //   map((r) => {
      //     console.log(r);
      //     localStorage.setItem("user", JSON.stringify(r));
      //     this.route.navigate(["events", "add-event"]);
      //   }),
      //   catchError(this.handleError)
      // );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
