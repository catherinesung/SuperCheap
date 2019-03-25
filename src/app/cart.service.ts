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

  private optimalSol = [];

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
    let product;
    for (product of this.cart){
      this.optimalSol.push({barcode: product.barcode, minPrice: this.comparePrice(product)});
    }
    console.log(this.optimalSol);
  }

  solutionPricePerSupermarket(){

  }

  // take Item as parameter, return a array
  comparePrice(product: Item){
    let supermarket;
    let minPriceArr = [];
    let supermarketList = ['price_aeon', 'price_dch', 'price_marketplace', 'price_parknshop', 'price_wellcome', 'price_waston'];
    var minPrice = 99999;

    // check the lowest price first
    for(supermarket of supermarketList){
      if(product[supermarket] !== null && product[supermarket] !== ''){
        if (product[supermarket] < minPrice){
          minPrice = product[supermarket];
        }
      }
    }

    // push the Supermarket name into the list if they have the min price
    for(supermarket of supermarketList){
      if(product[supermarket] != null && product[supermarket] !== ''){
        if (product[supermarket] === minPrice){
          minPriceArr.push({supermarket: supermarket, price: product[supermarket]});
        }
      }
    }
    return minPriceArr; // return minPriceArr with the structure of [{name of supermarket,price},{...},{...}]
  }

}
