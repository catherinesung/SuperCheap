import { Component, OnInit } from '@angular/core';
import {Item} from '../item';
import { PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  quantity: number;
  supermarket: string;
  fitem: Item;
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
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
    const data = [this.supermarket, this.quantity];
   this.popoverController.dismiss( data, 'confirm');
    console.log('dismissed' );
  }
  async donePopf() {
    const data = [this.supermarket, this.quantity];
    this.popoverController.dismiss( data, 'fail');
    console.log('dismissed' + data);
  }
}
