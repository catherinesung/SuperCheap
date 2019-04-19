import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import { PopoverController} from '@ionic/angular';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  quantity: number;
  supermarket: string;
  fitem: Item;
  calledBy: string;

  constructor(public popoverController: PopoverController, private cartService: CartService) { }

  ngOnInit() {
    this.supermarket = 'price_wellcome';
    this.quantity = 1;
    // if it is called by cart
    if (this.calledBy === 'cart'){
      this.supermarket = this.fitem.displayPrice[0];
      this.quantity = this.cartService.findProductInCart(this.fitem).quantity;
      console.log(this.fitem.displayPrice[0]);
    }
  }

  onChangem(entrysupermarket: any) {
    this.supermarket = entrysupermarket;
    console.log(this.supermarket);
  }
  onChange(entryquantity: number) {
    this.quantity = entryquantity;
    console.log(this.quantity);
  }
  async donePops() {
    console.log(this.quantity);
    const data = [this.supermarket, this.quantity];
    if(this.quantity != null && this.quantity !== 0){
      this.popoverController.dismiss( data, 'confirm');
    }
    else{
      console.log('請輸入數量！')
    }
    console.log('dismissed');
  }
  async donePopf() {
    const data = [this.supermarket, this.quantity];
    this.popoverController.dismiss( data, 'fail');
    console.log('dismissed' + data);
  }

  minusQuantity(){
    if(this.quantity > 1){
      this.quantity --;
    }
  }

  addQuantity(){
    this.quantity ++;
  }
  debug(){
    console.log('change');
    console.log(this.quantity);
  }

}
