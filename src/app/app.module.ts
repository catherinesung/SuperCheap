import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {FormsModule} from '@angular/forms';
import { PopoverComponent } from './popover/popover.component';
import {AgmCoreModule, GoogleMapsAPIWrapper,} from '@agm/core';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {NavController} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SafariViewController} from '@ionic-native/safari-view-controller/ngx';
import {ResultfilterComponent} from './resultfilter/resultfilter.component';
import { CheckoutAlertComponent } from './checkout-alert/checkout-alert.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1993159840992698')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('948793870391-33cd1nqn5ied19votl0ooirllu6iuvvt.apps.googleusercontent.com')
        }
      ]);
  return config;
}

@NgModule({
  declarations: [AppComponent, PopoverComponent, ResultfilterComponent, CheckoutAlertComponent],
  entryComponents: [PopoverComponent, ResultfilterComponent, CheckoutAlertComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, AgmCoreModule, SocialLoginModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyD0POsH6N_XE7PSJtt1SIHmsJtvnSOT5pE'
  })],
  providers: [
      StatusBar,
    SplashScreen,
    BarcodeScanner,
      NativeGeocoder,
      Geolocation,
      WheelSelector,
      CallNumber,
      NavController,
      ModalController,
      InAppBrowser,
      SafariViewController,
      GoogleMapsAPIWrapper,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
