import {Component, OnInit} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  cart = [];
  items = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
    console.log(this.cart);
    this.cartService.solutionPricePerProduct();
  }
}
