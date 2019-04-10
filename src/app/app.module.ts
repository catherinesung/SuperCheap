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
import {AgmCoreModule,  } from '@agm/core';
import {Geocoder} from '@ionic-native/google-maps';

@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, AgmCoreModule,
    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyD0POsH6N_XE7PSJtt1SIHmsJtvnSOT5pE'
  })],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
