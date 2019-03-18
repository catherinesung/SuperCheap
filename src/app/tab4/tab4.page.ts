import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  cart = [];
  items = [];

  constructor(private cartService: CartService, private router: Router){}

  ngOnInit(){
    this.cartService.addProduct({id: 1, name: 'product1', price_a: 8, price_b: 9, price_c: 8, price_d: 11, price_e: 12, price_f: 13, price_g: 14});
    this.cartService.addProduct({id: 2, name: 'product2', price_a: 4, price_b: 5, price_c: 4, price_d: 7, price_e: 8, price_f: 9, price_g: 10});
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
    console.log(this.cart);
    this.cartService.solutionPricePerProduct();
  }
}
