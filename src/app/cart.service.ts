import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private total = [0];

  private cart = [];

  constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product: Item, quantity: number, displaySupermarket: string) {
    if (this.cart.find(productInCart => productInCart.item.barcode === product.barcode)){
      const result = this.cart.find(productInCart => productInCart.item.barcode === product.barcode);
      result.quantity += quantity;
    }
    else{
      product['displayPrice'] = [displaySupermarket, product[displaySupermarket]];
      this.cart.push({item: product, quantity: quantity});
      this.solutionPricePerProduct();
    }
    this.calculateTotal();
    console.log('added ' + product.name_tc);
  }

  removeProduct(product: Item){
    if (this.cart.find(productInCart => productInCart.item === product)) {
      const result = this.cart.find(productInCart => productInCart.item === product);
      this.cart.splice(this.cart.indexOf(result),1);
      console.log(result.item.name_tc + ' removed');
    }
    this.calculateTotal();
  }

  clearCart() {
    while(this.cart.length > 0 ){
      this.cart.pop();
    }
    console.log('Cart is cleared!');
    this.calculateTotal();
  }

  calculateTotal(){
    this.total[0] = 0;
    for (let product of this.cart){
      this.total[0] += product.item.displayPrice[1] * product.quantity;
    }
  }

  getTotal(){
    return this.total;
  }

  findProductInCart(product: Item){

  }

  solutionPricePerProduct() {
    for (let product of this.cart) {
      product['minPrice'] = this.comparePrice(product.item);
    }
  }

  // take Item as parameter, return a array
  comparePrice(product: Item) {
    let supermarket;
    const minPriceArr = [];
    const supermarketList = ['price_parknshop', 'price_wellcome', 'price_marketplace', 'price_aeon', 'price_dch', 'price_waston'];
    let minPrice = 99999;

    // check the lowest price first
    for (supermarket of supermarketList) {
      if (product[supermarket] !== null && product[supermarket] !== '') {
        if (product[supermarket] < minPrice) {
          minPrice = product[supermarket];
        }
      }
    }

    // push the Supermarket name into the list if they have the min price
    for (supermarket of supermarketList) {
      if (product[supermarket] != null && product[supermarket] !== '') {
        if (product[supermarket] === minPrice) {
          minPriceArr.push({supermarket: supermarket, price: product[supermarket]});
        }
      }
    }
    return minPriceArr; // return minPriceArr with the structure of [{name of supermarket,price},{...},{...}]
  }
}
