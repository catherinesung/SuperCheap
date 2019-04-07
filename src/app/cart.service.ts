import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [];

  private cart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: Item, quantity: number, displaySupermarket: string) {
    if (this.cart.find(productInCart => productInCart.item === product)){
      const result = this.cart.find(productInCart => productInCart.item === product);
      result.quantity += quantity;
    }
    else{
      product['displayPrice'] = [displaySupermarket, product[displaySupermarket]];
      this.cart.push({item: product, quantity: quantity});
      this.solutionPricePerProduct();
    }
    console.log('added ' + product.name_en);
  }

  removeProduct(product: Item){
    if (this.cart.find(productInCart => productInCart.item === product)) {
      const result = this.cart.find(productInCart => productInCart.item === product);
      result.quantity = 0;
      console.log(result.item.name_en + ' removed');
    }
  }

  clearCart() {
    while(this.cart.length > 0 ){
      this.cart.pop();
    }
    console.log('Cart is cleared!');
  }

  calculateTotal(){
    let total = 0;
    for (let product of this.cart){
      total += product.item.displayPrice[1] * product.quantity;
    }
    return total;
  }

  findProductInCart(product: Item){

  }

  solutionPricePerProduct() {
    for (let product of this.cart) {
      product['minPrice'] = this.comparePrice(product.item);
    }
  }

  solutionPricePerSupermarket(supermarket: string) {
    let product, numberOfProduct = 0, totalPrice = 0;
    for (product of this.cart) {
      if (product[supermarket] !== null && product[supermarket] !== '') {
        numberOfProduct ++;
        totalPrice += product[supermarket];
      }
    }
    console.log(totalPrice, numberOfProduct);
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
