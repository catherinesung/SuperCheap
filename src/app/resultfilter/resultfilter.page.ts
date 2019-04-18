import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Item} from '../item';

@Component({
  selector: 'app-resultfilter',
  templateUrl: './resultfilter.page.html',
  styleUrls: ['./resultfilter.page.scss'],
})
export class ResultfilterPage implements OnInit {

  constructor( public modalController: ModalController  ) {}
  brand: any;
  fitems: Item[];
  distinctbrand: any;
  lowerPrice: number;
  upperPrice: number;
  price: any;
  ngOnInit() {
    for ( const fitem of this.fitems) {
      this.brand.push(fitem.brand_tc);
      this.distinctbrand = this.brand.unique();
    }
  }
  setprice(price) {
    this.lowerPrice = price.lower;
    this.upperPrice = price.upper;
  }
  onCancel() {
    const data = [this.brand, this.lowerPrice, this.upperPrice];
    this.modalController.dismiss( data, 'fail');
  }
  onConfirm() {const data = [this.brand, this.lowerPrice, this.upperPrice];
    this.modalController.dismiss( data, 'confirm');
  }

}
