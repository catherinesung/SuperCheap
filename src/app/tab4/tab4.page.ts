import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {Item} from '../item';
import {IonList} from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {
  cart = [];
  items = [];
  total = [0];
  supermarket = 'min_price';
  delivery = false;
  deliveryDetails = [];
  @ViewChild('slidingList') slidingList: IonList;

  constructor(private itemservice: ItemService, private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.deliveryDetails = this.cartService.getDeliveryDetails();
    this.calculateTotal();
    console.log(this.cart);
    console.log(this.total);
  }

  /*addToCart(product: Item){
    this.cartService.addProduct(product,1, 'price_wellcome');
    this.cart = this.cartService.getCart();
    this.calculateTotal();
    console.log('Cart:');
    console.log(this.cart);
  }*/

  async removeProduct(product: Item){
    await this.slidingList.closeSlidingItems();
    this.cartService.removeProduct(product);
    this.calculateTotal();
    console.log('Cart:');
    console.log(this.cart);
  }

  emptyCart(){
      this.cartService.clearCart();
      this.calculateTotal();
      console.log('Cart:');
      console.log(this.cart);
  }

  calculateTotal(){
      this.total = this.cartService.getTotal();
  }

  calculateMethodChange(){
    if (this.supermarket !== 'min_price'){
      if (this.supermarket !==''){
        for (let products of this.cart){
          products.item.displayPrice[0] = this.supermarket;
        }
      }
    }
    else{
      for (let products of this.cart){
        products.item.displayPrice[0] = products.minPrice[0].supermarket;
      }
    }
  }

  displaySupermarketChange(product: Item){
    product.item.displayPrice[1] = product.item[product.item.displayPrice[0]];
    for (let products of this.cart){
      if(this.supermarket !== 'min_price'){
        if (products.item.displayPrice[0] !== this.supermarket){
          this.supermarket = '';
        }
      }
    }
    this.cartService.calculateTotal();
  }

  debug(){
    console.log(this.cart);
  }

  debug2(){
    console.log(this.total);
  }

  refreshCart(event){
    this.cartService.calculateTotal();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  supermarketExistedInCart(supermarket: string){
    let temp = 0;
    for (let products of this.cart){
      if(products.item.displayPrice[0] === supermarket){
        temp ++;
      }
    }
    if (temp === 0){
      return false;
    }
    else return true;
  }
}
