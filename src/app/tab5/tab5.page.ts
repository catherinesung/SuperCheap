import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { fs } from 'file-system';

declare var require: any;
/// <reference path="C:\Users\SY\SuperCheap\node_modules\tsutils\typeguard/node.d.ts" />

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})

export class Tab5Page implements OnInit {
  constructor( private socialAuthService: AuthService ) {}

  ngOnInit(): void {

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
      /*const fs = require('fs');
      fs.writeFile('./user.json', JSON.stringify(userData), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File has been created');
    });*/
      // Now sign-in with userData
          // ...
    });
  }
}
