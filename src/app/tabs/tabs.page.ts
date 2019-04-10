import {Component, OnInit} from '@angular/core';
import {ItemService} from '../item.service';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})



export class TabsPage implements OnInit {
  private cart = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }
}
