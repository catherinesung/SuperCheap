import { Injectable } from '@angular/core';
import {Item} from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private total = [0, 0, 0, 0, 0, 0, 0, 0];
  //total[0]:product total
  //total[1]:aeon delivery
  //total[2]:dch delivery
  //total[3]:marketplace delivery
  //total[4]:parknshop delivery
  //total[5]:wellcome delivery
  //total[6]:waston
  //total[7]:total including delivery

  private cart = [];

  private deliveryDetails = [
      null,
    {member: false}, //aeon1
    {remote:false, discoveryBay:false}, //dch2
    {remote:false, lantauIsland:false}, //marketplace3
    {dummy:false}, //parknshop4
    {remote:false}, //wellcome5
    {remote:false} //waston6
  ]

  constructor() { }

  getCart() {
    return this.cart;
  }

  getDeliveryDetails(){
    return this.deliveryDetails;
  }

  addProduct(product: Item, quantity: number, displaySupermarket: string) {
    if (this.cart.find(productInCart => productInCart.item.barcode === product.barcode)){
      const result = this.cart.find(productInCart => productInCart.item.barcode === product.barcode);
      result.quantity += quantity;
    }
    else{
      product['displayPrice'] = [displaySupermarket, product[displaySupermarket]];
      product['checked'] = false;
      this.cart.push({item: product, quantity: quantity});
      this.solutionPricePerProduct();
    }
    //this.checkRemarks();
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

  changeQuantity(product: Item, quantity: number, supermarket: string){
    if (this.cart.find(productInCart => productInCart.item.barcode === product.barcode)){
      const result = this.cart.find(productInCart => productInCart.item.barcode === product.barcode);
      result.quantity = quantity;
      result.item.displayPrice[0] = supermarket;
      result.item.displayPrice[1] = result.item[result.item.displayPrice[0]];
    }
    //this.checkRemarks();
    this.calculateTotal();
  }

  isProductInCart(product: Item){
    if (this.cart.find(productInCart => productInCart.item.barcode === product.barcode)){
      return true;
    }
    else return false;
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
      let subTotal = this.checkRemarks(product);
      if (subTotal === -1){
        this.total[0] += +product.item.displayPrice[1] * product.quantity;
      }
      else{
        this.total[0] += subTotal;
      }
    }
    this.calculateDeliveryFee();
    this.total[7] = this.total[0] + this.total[1] + this.total[2] + this.total[3] + this.total[4] + this.total[5] + this.total[6];
  }

  calculateDeliveryFee(){
    for (let i = 1; i < 8; i++ ){
      this.total[i] = 0;
    }

    var aeon_temp = 0;
    var dch_temp = 0;
    var marketplace_temp = 0;
    var parknshop_temp = 0;
    var wellcome_temp = 0;
    var waston_temp = 0;

    for (let product of this.cart){
      if (product.item.displayPrice[0] === 'price_aeon'){
        aeon_temp += +product.item.displayPrice[1] * product.quantity;
      }
      else if (product.item.displayPrice[0] === 'price_dch'){
        dch_temp += +product.item.displayPrice[1] * product.quantity;
      }
      else if (product.item.displayPrice[0] === 'price_marketplace'){
        marketplace_temp += +product.item.displayPrice[1] * product.quantity;
      }
      else if (product.item.displayPrice[0] === 'price_parknshop'){
        parknshop_temp += +product.item.displayPrice[1] * product.quantity;
      }
      else if (product.item.displayPrice[0] === 'price_wellcome'){
        wellcome_temp += +product.item.displayPrice[1] * product.quantity;
      }
      else if (product.item.displayPrice[0] === 'price_waston'){
        waston_temp += +product.item.displayPrice[1] * product.quantity;
      }
    }
    this.aeonDeliveryFee(aeon_temp);
    this.dchDeliveryFee(dch_temp);
    this.marketplaceDeliveryFee(marketplace_temp);
    this.parknshopDeliveryFee(parknshop_temp);
    this.wellcomeDeliveryFee(wellcome_temp);
    this.wastonDeliveryFee(waston_temp);

  }

  aeonDeliveryFee(aeon_temp){
    if (this.deliveryDetails[1].member === false){
      if(aeon_temp !== 0){
        if(aeon_temp < 800){
          this.total[1] = 70;
        }
        else if (aeon_temp >= 800){
          this.total[1] = 0;
        }
      }
      else if(aeon_temp === 0){
        this.total[1] = 0;
      }
    }
    else{
      if(aeon_temp !== 0){
        if(aeon_temp < 500){
          this.total[1] = 70;
        }
        else if (aeon_temp >= 500){
          this.total[1] = 0;
        }
      }
      else if(aeon_temp === 0){
        this.total[1] = 0;
      }
    }
  }

  dchDeliveryFee(dch_temp){
    if (this.deliveryDetails[2].discoveryBay === true){
      if(dch_temp !== 0){
        if(dch_temp < 800){
          this.total[2] = 160 + 50;
        }
        else if (dch_temp >= 800){
          this.total[2] = 160;
        }
      }
      else if(dch_temp === 0){
        this.total[2] = 0;
      }
    }
    else if (this.deliveryDetails[2].remote === true){
      if(dch_temp !== 0){
        if(dch_temp < 800){
          this.total[2] = 50 + 50;
        }
        else if (dch_temp >= 800 && dch_temp < 980){
          this.total[2] = 50;
        }
        else if (dch_temp >= 980){
          this.total[2] = 0;
        }
      }
      else if(dch_temp === 0){
        this.total[2] = 0;
      }
    }
    else if (this.deliveryDetails[2].remote === false && this.deliveryDetails[2].discoveryBay === false ){
      if(dch_temp !== 0){
        if(dch_temp < 800){
          this.total[2] = 50;
        }
        else if (dch_temp >= 800){
          this.total[2] = 0;
        }
      }
      else if(dch_temp === 0){
        this.total[2] = 0;
      }
    }
  }

  marketplaceDeliveryFee(marketplace_temp){
    if (this.deliveryDetails[3].remote === true){
      if(marketplace_temp !== 0){
        if(marketplace_temp < 500){
          this.total[3] = 70;
        }
        else if (marketplace_temp >= 500){
          this.total[3] = 40;
        }
      }
      else if(marketplace_temp === 0){
        this.total[3] = 0;
      }
    }
    else if (this.deliveryDetails[3].lantauIsland === true){
      if(marketplace_temp !== 0){
        if(marketplace_temp < 500){
          this.total[3] = 120;
        }
        else if (marketplace_temp >= 500 && marketplace_temp < 1200){
          this.total[3] = 90;
        }
        else if (marketplace_temp >= 1200){
          this.total[3] = 0;
        }
      }
      else if(marketplace_temp === 0){
        this.total[3] = 0;
      }
    }
    else if (this.deliveryDetails[3].remote === false && this.deliveryDetails[3].lantauIsland === false ){
      if(marketplace_temp !== 0){
        if(marketplace_temp < 500){
          this.total[3] = 30;
        }
        else if (marketplace_temp >= 500){
          this.total[3] = 0;
        }
      }
      else if(marketplace_temp === 0){
        this.total[3] = 0;
      }
    }
  }

  parknshopDeliveryFee(parknshop_temp){
    if(parknshop_temp !== 0){
      if(parknshop_temp < 500){
        this.total[4] = 30;
      }
      else if (parknshop_temp >= 500){
        this.total[4] = 0;
      }
    }
    else if(parknshop_temp === 0){
      this.total[4] = 0;
    }
  }

  wellcomeDeliveryFee(wellcome_temp){
    if (this.deliveryDetails[5].remote === false){
      if(wellcome_temp !== 0){
        if(wellcome_temp < 500){
          this.total[5] = 30;
        }
        else if (wellcome_temp >= 500){
          this.total[5] = 0;
        }
      }
      else if(wellcome_temp === 0){
        this.total[5] = 0;
      }
    }
    else{
      if(wellcome_temp !== 0){
        if(wellcome_temp < 500){
          this.total[5] = 70;
        }
        else if (wellcome_temp >= 500){
          this.total[5] = 40;
        }
      }
      else if(wellcome_temp === 0){
        this.total[5] = 0;
      }
    }
  }

  wastonDeliveryFee(waston_temp){
    if(waston_temp !== 0){
      if(waston_temp < 250){
        this.total[6] = 40;
      }
      else{
        this.total[6] = 0;
      }
    }
    else if(waston_temp === 0){
      this.total[6] = 0;
    }
  }

  getTotal(){
    return this.total;
  }

  findProductInCart(product: Item){
    if (this.cart.find(productInCart => productInCart.item === product)) {
      const result = this.cart.find(productInCart => productInCart.item === product);
      return result;
    }
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
      if (product[supermarket] !== 0 && product[supermarket] !== '') {
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

  checkRemarks(products){
      let checkKey = 'remark_' + products.item.displayPrice[0].substr(6);
      if (products.item[checkKey][0] !== -1 && products.item[checkKey][1] !== -1){
        // Buy x at $x
        if(products.item[checkKey][2] === 0){
          // console.log('Buy x at $x');
          return(
              (Math.floor(products.quantity / products.item[checkKey][0]) * products.item[checkKey][1])
              + (products.quantity) % products.item[checkKey][0] * products.item.displayPrice[1]);
        }
        // Buy x get x free
        if(products.item[checkKey][2] === 1){
          // console.log('Buy' + products.item[checkKey][3] + 'get' + products.item[checkKey][4] + 'free');
          let remainingPrice = 0;
          if ((products.quantity % products.item[checkKey][0]) > products.item[checkKey][3] || (products.quantity % products.item[checkKey][0]) === 0 ){
            remainingPrice = 0;
          }
          else{
            remainingPrice = (products.quantity) % products.item[checkKey][0] * products.item.displayPrice[1];
          }
          return(
              (Math.floor(products.quantity / products.item[checkKey][0]) * products.item[checkKey][1])
              + remainingPrice
          );
        }
      }
      else{
        // console.log('no remarks');
        return -1;
      }
    }
}
