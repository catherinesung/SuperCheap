import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /*private data = [
    {id: 0, name: 'product1', price: '8'},
    {id: 1, name: 'product1', price: '8'},
    {id: 2, name: 'product1', price: '8'}
  ];*/

  private data = [];

  private cart = [];

  constructor() { }

  getProducts(){
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  addProduct(product: Item){
    this.cart.push(product);
    console.log('add ' + product.name_en);
  }

  solutionPricePerProduct(){
    let product, supermarket;
    let supermarketList = ['price_aeon', 'price_dch', 'price_marketplace', 'price_parknshop', 'price_wellcome', 'price_waston'];

    for (product of this.cart){
      var minPrice = 99999;
      var minPriceList = [];
      for(supermarket of supermarketList){
        if(product[supermarket] != null && product[supermarket] !== ''){
          if (product[supermarket] < minPrice){
            // console.log(product[supermarket] + '<' + minPrice);
            minPrice = product[supermarket];
            minPriceList.push(supermarket);
          }
          else if(product[supermarket] === minPrice){
            minPriceList.push(supermarket);
          }
        }
      }
      console.log(minPriceList);
    }
  }

  solutionPricePerSupermarket(){

  }
}
