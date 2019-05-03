import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-checkout-alert',
  templateUrl: './checkout-alert.component.html',
  styleUrls: ['./checkout-alert.component.scss']
})
export class CheckoutAlertComponent implements OnInit {

  cart = [];
  aeon = [];
  dch = [];
  marketplace = [];
  parknshop = [];
  wellcome = [];
  waston = [];

  total = [0, 0, 0, 0, 0, 0, 0, 0];
  //total[0]:dummy
  //total[1]:aeon
  //total[2]:dch
  //total[3]:marketplace
  //total[4]:parknshop
  //total[5]:wellcome
  //total[6]:waston

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    for (let i = 1; i < 7; i++ ){
      this.total[i] = 0;
    }
    this.splitMarket('price_aeon', this.aeon);
    this.splitMarket('price_dch', this.dch);
    this.splitMarket('price_marketplace', this.marketplace);
    this.splitMarket('price_parknshop', this.parknshop);
    this.splitMarket('price_wellcome', this.wellcome);
    this.splitMarket('price_waston', this.waston);
    this.total[1] = this.calculateTotal(this.aeon);
    this.total[2] = this.calculateTotal(this.dch);
    this.total[3] = this.calculateTotal(this.marketplace);
    this.total[4] = this.calculateTotal(this.parknshop);
    this.total[5] = this.calculateTotal(this.wellcome);
    this.total[6] = this.calculateTotal(this.waston);
  }

  splitMarket(supermarket: string, supermarketArr){
    for (const products of this.cart){
      if (products.item.displayPrice[0] === supermarket){
        supermarketArr.push(products);
      }
    }
  }

  calculateTotal(supermarketArr){
    let temp = 0;
    for(const products of supermarketArr){
      temp += +products.item.displayPrice [1] * products.quantity;
    }
    return temp;
  }

}
