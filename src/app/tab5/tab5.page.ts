import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { HttpClient } from '@angular/common/http';

import {User} from '../user';
import {UserService, user} from '../user.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page implements OnInit {
  theuser: User;
  login: boolean;
  couponpage: boolean;

  constructor( private socialAuthService: AuthService, private http: HttpClient,
               private userservice: UserService) {}

  ngOnInit(): void {
      this.login = false;
      this.couponpage = false;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      console.log(socialPlatform + ' sign in data : ', userData);
      this.theuser = userData;
      this.userservice.postUser(this.theuser).subscribe();
      this.login = true;
    });
  }

  coupon(): void {
    this.couponpage = true;
  }

  couponout(): void {
    this.couponpage = false;
  }

  logout(): void {
    this.login = false;
  }
}
