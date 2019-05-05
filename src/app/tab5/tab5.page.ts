import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { HttpClient } from '@angular/common/http';

import {User} from '../user';
import {UserService} from '../user.service';
import {UserRecordService} from '../user-record.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SafariViewController} from '@ionic-native/safari-view-controller/ngx';

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
               private userservice: UserService, private userrecordservice: UserRecordService,
               private theInAppBrowser: InAppBrowser, private safariViewController: SafariViewController) {}

  ngOnInit(): void {
      this.login = false;
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
    const shoppingCart = 'https://www.parknshop.com/zh-hk/shoppingCart';
    this.openNewTab(shoppingCart, false);
  }

  logout(): void {
    this.login = false;
  }

  openNewTab(url, hidden: boolean){
    return new Promise ((resolve, reject) => {
      this.safariViewController.isAvailable()
          .then((available: boolean) => {
                if (available) {
                  this.safariViewController.show({
                    url: url,
                    hidden: hidden,
                    animated: false,
                    transition: 'curl',
                    enterReaderModeIfAvailable: false,
                    tintColor: '#ff0000'
                  })
                      .subscribe((result: any) => {
                            if (result.event === 'opened') {
                              // console.log('Opened');
                              console.log(url + 'opened');
                            }
                            else if(result.event === 'loaded') {
                              // console.log('Loaded');
                              resolve();
                              console.log(url + 'loaded');
                            }
                            else if(result.event === 'closed') {
                              console.log('Closed');
                            }
                          },
                          (error: any) => {
                            console.error(error);
                            reject();
                          }
                      );

                } else {
                  // use fallback browser, example InAppBrowser
                }
              }
          );
    });
  }
}
