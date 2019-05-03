import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = 'http://www-std.se.cuhk.edu.hk/~fyp_r18';
  users: User[];

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error in getting items');
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseurl}/user.php`,
        {data: user}).pipe();
  }
}
