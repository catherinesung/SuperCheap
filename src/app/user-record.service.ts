import { Injectable } from '@angular/core';

import { UserRecord } from './user-record';
import {Observable} from 'rxjs';
import {User} from './user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {
  record: UserRecord;
  baseurl = 'http://www-std.se.cuhk.edu.hk/~fyp_r18';

  constructor(private http: HttpClient) {
    this.record.id = 'guest';
  }

  userIdentity(provider: string, id: string): void {
    this.record.provider = provider;
    this.record.id = id;
  }

  recordAction(action: string, ref: string): void {
    this.record.action = action;
    this.record.reference = ref;
    this.record.time = Date();
    this.postRecord(this.record);
  }

  postRecord(userrecord: UserRecord): Observable<UserRecord> {
    return this.http.post<UserRecord>(`${this.baseurl}/user_record.php`,
        {data: userrecord}).pipe();
  }
}
