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
    this.cartService.addProduct({id: 0, name: 'product1', price: '8'});
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
    console.log(this.cart);
  }
}
