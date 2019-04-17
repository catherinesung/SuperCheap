import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {Item} from '../item';
import {AlertController, IonList} from '@ionic/angular';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';
import {PickerController} from '@ionic/angular';
import {PopoverController } from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';

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

  constructor(private itemservice: ItemService,
              private cartService: CartService,
              private router: Router,
              public popoverController: PopoverController,
              public pickerCtrl: PickerController,
              public alertController: AlertController) {}

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

  async removeProduct(product: Item) {
    await this.slidingList.closeSlidingItems();
    this.cartService.removeProduct(product);
    this.calculateTotal();
    console.log('Cart:');
    console.log(this.cart);
  }

  emptyCart() {
    this.cartService.clearCart();
    this.calculateTotal();
    console.log('Cart:');
    console.log(this.cart);
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  calculateMethodChange() {
    if (this.supermarket !== 'min_price') {
      if (this.supermarket !== '') {
        for (let products of this.cart) {
          products.item.displayPrice[0] = this.supermarket;
          this.displaySupermarketChange(products);
        }
      }
    } else {
      for (let products of this.cart) {
        products.item.displayPrice[0] = products.minPrice[0].supermarket;
        this.displaySupermarketChange(products);
      }
    }

  }

  displaySupermarketChange(product: Item) {
    console.log(product.item[product.item.displayPrice[0]]);
    product.item.displayPrice[1] = product.item[product.item.displayPrice[0]];
    for (let products of this.cart) {
      if (this.supermarket !== 'min_price') {
        if (products.item.displayPrice[0] !== this.supermarket) {
          //this.supermarket = '';
          console.log('debug');
        }
      }
    }
    this.cartService.calculateTotal();
  }

  debug() {
    console.log(this.cart);
  }

  debug2() {
    console.log(this.total);
  }

  refreshCart(event) {
    this.cartService.calculateTotal();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  supermarketExistedInCart(supermarket: string) {
    let temp = 0;
    for (let products of this.cart) {
      if (products.item.displayPrice[0] === supermarket) {
        temp++;
      }
    }
    if (temp === 0) {
      return false;
    } else return true;
  }

  async popOver(product: Item) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        'fitem': product,
        'calledBy': 'cart'
      },
      backdropDismiss: false,
      animated: true,
      showBackdrop: true
    });

    await popover.present();
    const model = await popover.onDidDismiss();

    switch (model.role) {
      case 'confirm':
        this.cartService.changeQuantity(product, Number(model.data[1]), model.data[0]);
        //product.displayPrice[1] = product[product.displayPrice[0]];
        console.log('confirm' + model.data[0] + model.data[1]);
        break;

      case 'fail':
        console.log('fail');
        break;
    }
  }

  async openPicker2(){
    const picker = await this.pickerCtrl.create({
      buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log(data.list.value);
            }
          },
          {
            text: 'Done',
            role: 'done',
            handler: data => {
              console.log(data.list.value);
            }
          }
          ],
      columns: [
        {
          name: 'list',
          options: [
            {
              text: 'apple',
              value: 'apple'
            },
            {
              text: 'orange',
              value: 'orange'
            },
            {
              text: 'banana',
              value: 'banana'
            },
          ]
        }
      ]
    })
    await picker.present();
  }
}
