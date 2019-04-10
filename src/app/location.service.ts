import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Storeinfo} from './storeinfo';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    baseurl = 'http://www-std.se.cuhk.edu.hk/~fyp_r18';
    storeinfo: Storeinfo[];

    constructor(private http: HttpClient) {
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        return throwError('Error in getting items');
    }

    getlocation(): Observable<Storeinfo[]> {
        return this.http.get(`${this.baseurl}/location.php`).pipe(
            map((res) => {
                this.storeinfo = res['data'];
                return this.storeinfo;
            }),
            catchError(this.handleError));
    }
}
