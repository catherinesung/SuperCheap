import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-resultfilter',
  templateUrl: './resultfilter.component.html',
  styleUrls: ['./resultfilter.component.scss']
})
export class ResultfilterComponent implements OnInit {
  constructor(public modalController: ModalController, public navParams: NavParams) {

    this.brands = (this.navParams.get('brands'));
  }
  brands: any;
  lowerPrice: any;
  upperPrice: any;
  BrandSelect = [];
  knobValues: {
    upper: any,
    lower: any
  };

  ngOnInit() {
    console.log(this.brands);
  }

  setprice(knobValues) {
    this.lowerPrice = knobValues.lower;
    this.upperPrice = knobValues.upper;
  }

  onCancel() {
    const data = [];
    this.modalController.dismiss(data, 'fail');
  }
  onConfirm() {
    const data = [this.lowerPrice, this.upperPrice];
    data.push(this.BrandSelect);
    this.modalController.dismiss(data , 'confirm');
  }
  addbrand(brand) {
    console.log(brand);
    this.BrandSelect.push(brand);
  }
}


