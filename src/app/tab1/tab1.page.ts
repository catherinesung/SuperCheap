import { Component} from '@angular/core';
import {Router} from '@angular/router';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  scannedData: {};
  constructor(private router: Router, private barcodeScanner: BarcodeScanner) { }
  Search(value: string) {
    this.router.navigate(['/result'], {queryParams: { keywords: value}});
  }
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedData = barcodeData;
      this.router.navigate(['/result'], {queryParams: { keywords: this.scannedData}});
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
