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
  lowerPrice: number;
  upperPrice: number;
  BrandSelected: string;
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
    const brandSelect = this.BrandSelected.toString();
    const data = [this.lowerPrice, this.upperPrice, brandSelect];
    this.modalController.dismiss(data, 'fail');
  }

  onConfirm() {
    const brandSelect = this.BrandSelected.toString();
    const data = [this.lowerPrice, this.upperPrice];
    console.log(data);
    console.log(brandSelect);
    this.modalController.dismiss(data , brandSelect, 'confirm');
  }
}

