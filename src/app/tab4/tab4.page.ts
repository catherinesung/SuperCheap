import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {Item} from '../item';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {
  cart = [];
  items = [];
  boughtItem: Item;
  total = 0;
  supermarket = '';

  testProduct1 = {
    barcode: '1234',
    name_tc: '\u7d14\u91ce\u82b1\u8702\u871c Wildflower 500\u514b',
    name_en: 'Wildflower Honey 500g',
    brand_tc: '\u871c\u5712\u724c Sweet Meadow',
    brand_en: 'Sweet Meadow',
    type_tc: '\u8702\u871c \/ \u871c\u7cd6 \/ \u7cd6\u6f3f',
    type_en: 'Honey \/ Syrup',
    price_aeon: null,
    price_dch: 29.90,
    price_marketplace: 24.90,
    price_parknshop: 62.90,
    price_wellcome: 30.90,
    price_waston: 799.00,
    remark_tc_aeon: null,
    remark_tc_dch: '',
    remark_tc_marketplace: '',
    remark_tc_parknshop: '',
    remark_tc_wellcome: '',
    remark_tc_waston: '',
    remark_en_aeon: null,
    remark_en_dch: '',
    remark_en_marketplace: '',
    remark_en_parknshop: '',
    remark_en_wellcome: '',
    remark_en_waston: ''};
  testProduct2 = {
    barcode: '5678',
    name_tc: 'Test product',
    name_en: 'Test product',
    brand_tc: 'fyp',
    brand_en: 'fyp',
    type_tc: '',
    type_en: '',
    price_aeon: null,
    price_dch: 1,
    price_marketplace: 2,
    price_parknshop: 3,
    price_wellcome: 4,
    price_waston: 5,
    remark_tc_aeon: null,
    remark_tc_dch: '',
    remark_tc_marketplace: '',
    remark_tc_parknshop: '',
    remark_tc_wellcome: '',
    remark_tc_waston: '',
    remark_en_aeon: null,
    remark_en_dch: '',
    remark_en_marketplace: '',
    remark_en_parknshop: '',
    remark_en_wellcome: '',
    remark_en_waston: ''};

  constructor(private itemservice: ItemService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  addToCart(product: Item){
    this.cartService.addProduct(product,1);
    this.cart = this.cartService.getCart();
    this.calculateTotal();
    console.log('Cart:');
    console.log(this.cart);
  }

  emptyCart(){
      this.cartService.clearCart();
      this.calculateTotal();
      console.log('Cart:');
      console.log(this.cart);
  }

  checkPriceByProduct(){
      this.cartService.solutionPricePerProduct();
      this.cart = this.cartService.getCart();
      this.calculateTotal();
      console.log('Cart:');
      console.log(this.cart);
  }

  calculateTotal(){
      this.total = this.cartService.calculateTotal();
  }

  ionChange(){
    console.log(this.supermarket);
  }

}
