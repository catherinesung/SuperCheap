import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {SafariViewController} from '@ionic-native/safari-view-controller/ngx';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-checkout-alert',
  templateUrl: './checkout-alert.component.html',
  styleUrls: ['./checkout-alert.component.scss']
})
export class CheckoutAlertComponent implements OnInit {

  cart = [];
  aeon = [];
  dch = [];
  marketplace = [];
  parknshop = [];
  wellcome = [];
  waston = [];

  total = [0, 0, 0, 0, 0, 0, 0, 0];
  //total[0]:dummy
  //total[1]:aeon
  //total[2]:dch
  //total[3]:marketplace
  //total[4]:parknshop
  //total[5]:wellcome
  //total[6]:waston

  constructor(private cartService: CartService,
              private safariViewController: SafariViewController,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    for (let i = 1; i < 7; i++ ){
      this.total[i] = 0;
    }
    this.splitMarket('price_aeon', this.aeon);
    this.splitMarket('price_dch', this.dch);
    this.splitMarket('price_marketplace', this.marketplace);
    this.splitMarket('price_parknshop', this.parknshop);
    this.splitMarket('price_wellcome', this.wellcome);
    this.splitMarket('price_waston', this.waston);
    this.total[1] = this.calculateTotal(this.aeon);
    this.total[2] = this.calculateTotal(this.dch);
    this.total[3] = this.calculateTotal(this.marketplace);
    this.total[4] = this.calculateTotal(this.parknshop);
    this.total[5] = this.calculateTotal(this.wellcome);
    this.total[6] = this.calculateTotal(this.waston);
  }

  splitMarket(supermarket: string, supermarketArr){
    for (const products of this.cart){
      if (products.item.displayPrice[0] === supermarket){
        supermarketArr.push(products);
      }
    }
  }

  calculateTotal(supermarketArr){
    let temp = 0;
    for(const products of supermarketArr){
      temp += +products.item.displayPrice [1] * products.quantity;
    }
    return temp;
  }

  async placeOrder(){
    const loading = await this.loadingController.create({
      message: '正在將貨品加入百佳網上商店購物車'
    });
    await loading.present();

    const shoppingCart = 'https://www.parknshop.com/en/shoppingCart';
    for (let products of this.parknshop) {
      const url = 'https://www.parknshop.com/en/cart/add?productCodePost=' + products.item.bp.substr(3) + '&qty=' + products.quantity;
      console.log(url);
      await new Promise(resolve => this.openNewTab(url, true)
          .then(() => resolve()));
    }
    loading.dismiss().then(
        () => {
          for (const products of this.cart){
            if (products.item.displayPrice[0] === 'price_parknshop'){
              this.cartService.removeProduct(products);
            }
          }
          this.openNewTab(shoppingCart, false);
        }
    );
  }

  openNewTab(url, hidden: boolean){
    return new Promise ((resolve, reject) => {
      this.safariViewController.isAvailable()
          .then((available: boolean) => {
                if (available) {
                  this.safariViewController.show({
                    url: url,
                    hidden: hidden,
                    animated: false,
                    transition: 'curl',
                    enterReaderModeIfAvailable: false,
                    tintColor: '#ff0000'
                  })
                      .subscribe((result: any) => {
                            if (result.event === 'opened') {
                              // console.log('Opened');
                              console.log(url + 'opened');
                            }
                            else if(result.event === 'loaded') {
                              // console.log('Loaded');
                              resolve();
                              console.log(url + 'loaded');
                            }
                            else if(result.event === 'closed') {
                              console.log('Closed');
                            }
                          },
                          (error: any) => {
                            console.error(error);
                            reject();
                          }
                      );

                } else {
                  // use fallback browser, example InAppBrowser
                }
              }
          );
    });
  }

}
