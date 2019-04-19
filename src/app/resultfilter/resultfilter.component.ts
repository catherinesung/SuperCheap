import { Component, OnInit } from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {Item} from '../item';

@Component({
  selector: 'app-resultfilter',
  templateUrl: './resultfilter.component.html',
  styleUrls: ['./resultfilter.component.scss']
})
export class ResultfilterComponent implements OnInit {

  constructor(public modalController: ModalController) {
  }

  brand: any;
  fitems: Item[];
  distinctbrand: any;
  lowerPrice: number;
  upperPrice: number;
  price: any;

  ngOnInit() {
    this.upperPrice = 990;
    this.lowerPrice = 0;
    for (const fitem of this.fitems) {
      this.brand.push(fitem.brand_tc);
      this.distinctbrand = this.brand.unique();
      console.log(this.distinctbrand);
    }
  }

  setprice(price) {
    this.lowerPrice = price.lower;
    this.upperPrice = price.upper;
  }

  onCancel() {
    const data = [this.brand, this.lowerPrice, this.upperPrice];
    this.modalController.dismiss(data, 'fail');
  }

  onConfirm() {
    const data = [this.brand, this.lowerPrice, this.upperPrice];
    this.modalController.dismiss(data, 'confirm');
  }
}

