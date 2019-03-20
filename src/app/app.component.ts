import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private itemservice: ItemService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  items: Item[];
  error = '';
  success = '';

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemservice.getAll().subscribe(
        (res: Item[]) => {
          this.items = res;
        },
        (err) => {
          this.error = err;
        }
    );
  }
}



