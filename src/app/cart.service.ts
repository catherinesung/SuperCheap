import { Injectable } from '@angular/core';
import {ITEMS} from './Items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /*private data = [
    {id: 0, name: 'product1', price: '8'},
    {id: 1, name: 'product1', price: '8'},
    {id: 2, name: 'product1', price: '8'}
  ];*/

  private data = ITEMS;


  private cart = [];

  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  addProduct(product){
    this.cart.push(product);
  }
}
