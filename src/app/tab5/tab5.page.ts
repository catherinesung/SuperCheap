import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { HttpClient } from '@angular/common/http';

import {User} from '../user';
import {UserService} from '../user.service';
import {UserRecordService} from '../user-record.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page implements OnInit {
  theuser: User;
  login: boolean;
  parknshop: boolean;

  constructor( private socialAuthService: AuthService, private http: HttpClient,
               private userservice: UserService, private userrecordservice: UserRecordService) {}

  ngOnInit(): void {
      this.login = false;
      this.parknshop = false;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      console.log(socialPlatform + ' sign in data : ', userData);
      this.theuser = userData;
      this.userservice.postUser(this.theuser).subscribe();
      this.login = true;
      this.userrecordservice.userIdentity(this.theuser.provider, this.theuser.id);
    });
  }

  openParknShop(): void {
    this.parknshop = true;
  }

  backtoAC(): void {
    this.parknshop = false;
  }

  logout(): void {
    this.login = false;
  }
}
