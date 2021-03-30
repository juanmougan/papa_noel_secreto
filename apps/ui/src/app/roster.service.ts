import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  rosterUrl = `${environment.restUrl}/api/rosters`;

  constructor(private http: HttpClient) {}

  submitRoster(roster: Array<string>): Observable<string> {
    return this.http.post<string>(this.rosterUrl, roster, httpOptions).pipe(
      catchError((error) => {
        console.error('Error sending mails to: ', error.error.errors);
        // return throwError(`${error.status} - ${error.statusText}`);
        return throwError(
          `Error sending mails to: ${(error.error.errors ?? []).join(', ')}`
        );
      })
    );
  }
}
