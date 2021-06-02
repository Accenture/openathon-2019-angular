import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Event } from "../models/event";

@Injectable({
  providedIn: "root"
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get(environment.apiURL + "events", { headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getFilteredEvents(filter): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get(environment.apiURL + "events?" + filter, { headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get(environment.apiURL + "events/" + id, { headers }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addEvent(event: Event): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http
      .post(environment.apiURL + "events/", event, { headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  updateEvent(event: Event): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http
      .put(environment.apiURL + "events/" + event.id, event, { headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteEvent(id: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http
      .delete(environment.apiURL + "events/" + id, { headers })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // Error handling

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
