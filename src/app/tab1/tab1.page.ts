import { Component} from '@angular/core';
import {Router} from '@angular/router';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  barcode: string;
  constructor(private router: Router, private barcodeScanner: BarcodeScanner) { }
  Search(value: string) {
    this.router.navigate(['tabs/tab1/result'], {queryParams: { keywords: value}});
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData.text;
      this.router.navigate(['tabs/tab1/result'], {queryParams: { keywords: this.barcode}});
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
