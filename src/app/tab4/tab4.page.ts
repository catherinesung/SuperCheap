import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../cart.service';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {Item} from '../item';
import {AlertController, IonList, LoadingController, ToastController} from '@ionic/angular';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';
import {PickerController} from '@ionic/angular';
import {PopoverController } from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';
import {SafariViewController} from '@ionic-native/safari-view-controller/ngx';
import {CheckoutAlertComponent} from '../checkout-alert/checkout-alert.component';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit {
  cart = [];
  items = [];
  total = [0];
  supermarket = 'cal_default';
  delivery = false;
  deliveryDetails = [];
  editToggled = false;
  sort = 'sort_default';

  private supermarketArr = ['price_parknshop', 'price_wellcome', 'price_marketplace', 'price_aeon', 'price_dch', 'price_waston'];

  @ViewChild('slidingList') slidingList: IonList;

  constructor(private itemservice: ItemService,
              private cartService: CartService,
              private router: Router,
              public popoverController: PopoverController,
              public pickerCtrl: PickerController,
              public alertController: AlertController,
              private theInAppBrowser: InAppBrowser,
              private safariViewController: SafariViewController,
              public toastController: ToastController,
              public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.deliveryDetails = this.cartService.getDeliveryDetails();
    this.calculateTotal();
    console.log(this.cart);
    console.log(this.total);
  }

  async removeProduct(product: Item) {
    await this.slidingList.closeSlidingItems();
    this.cartService.removeProduct(product);
    console.log('Cart:');
    console.log(this.cart);
  }

  async removeMultiple(){
    const alert = await this.alertController.create({
      header: '刪除貨品',
      message: '你是否確定要刪除所選貨品？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '確定',
          handler: () => {
            for (const products of this.cart){
              if (products.item.checked){
                this.removeProduct(products.item);
              }
              this.editToggled = false;
            }
            this.cartService.calculateTotal();
          }
        }
      ],
    });
    await alert.present();
  }

  async emptyCart() {
    const alert = await this.alertController.create({
      header: '清空購物車',
      message: '你是否確定要清空購物車？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '確定',
          handler: () => {
            this.cartService.clearCart();
            this.editToggled = false;
          }
        }
      ],
    });
    await alert.present();
  }

  editCart(){
    for (const products of this.cart){
      products.item.checked = false ;
    }
    if (this.cart.length !== 0){
      this.editToggled = !this.editToggled;
    }
  }

  calculateTotal() {
    this.total = this.cartService.getTotal();
  }

  calculateMethodChange() {
    if (this.supermarket === 'cal_default') {
    }
    else if (this.supermarket === 'min_price') {
      for (let products of this.cart) {
        products.item.displayPrice[0] = products.minPrice[0].supermarket;
        this.displaySupermarketChange(products);
      }
    }
    else {
      if (this.supermarket !== '') {
        for (let products of this.cart) {
          if (products.item[this.supermarket] !== 0){
            products.item.displayPrice[0] = this.supermarket;
            this.displaySupermarketChange(products);
          }
        }
      }
    }
  }


  displaySupermarketChange(product: Item) {
    console.log(product.item[product.item.displayPrice[0]]);
    product.item.displayPrice[1] = product.item[product.item.displayPrice[0]];
    for (let products of this.cart) {
      if (this.supermarket !== 'min_price') {
        if (products.item.displayPrice[0] !== this.supermarket) {
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

  redirectToParknshop(){
    const shoppingCart = 'https://www.parknshop.com/zh-hk/shoppingCart';
    this.openNewTab(shoppingCart, false);
  }

  async placeOrder(){
    const popover = await this.popoverController.create({
      component: CheckoutAlertComponent,
      componentProps: {
        'calledBy': 'cart'
      },
      backdropDismiss: false,
      animated: true,
      showBackdrop: true,
    });

    await popover.present();
    /*
    const loading = await this.loadingController.create({
      message: '正在將貨品加入百佳網上商店購物車'
    });
    await loading.present();

    const shoppingCart = 'https://www.parknshop.com/en/shoppingCart';
    for (let products of this.cart) {
      const url = 'https://www.parknshop.com/en/cart/add?productCodePost=' + products.item.bp.substr(3) + '&qty=' + products.quantity;
      console.log(url);
      await new Promise(resolve => this.openNewTab(url, true)
          .then(() => resolve()));
    }
    loading.dismiss().then(
        () => {
          this.openNewTab(shoppingCart, false);
        }
    );*/
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
        this.presentToast( product.brand_tc + product.name_tc + '已更新', 2000);
        console.log('confirm' + model.data[0] + model.data[1]);
        this.supermarket = 'cal_default';
        this.sort = 'sort_default';
        break;

      case 'fail':
        console.log('fail');
        break;
    }
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: 'secondary',
      position: 'top'
    });
    toast.present();
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

  selectAll(){
    for (let products of this.cart) {
      products.item.checked = !products.item.checked;
    }
  }

  deliverySettings(supermarket: string){
    console.log(supermarket);
  }

  sortMethodChange(){
    if(this.sort === 'sort_by_price'){
      this.cart = this.cart.sort(function (obj1, obj2){
        return obj1.item.displayPrice[1] - obj2.item.displayPrice[1];
      });
    }
    if(this.sort === 'sort_by_shop'){
      this.cart = this.cart.sort((obj1, obj2) => (obj1.item.displayPrice[0] > obj2.item.displayPrice[0]) ? 1 : -1);
    }
  }

  productDetail(product){
    this.router.navigate(['/tabs/tab4/product'], { queryParams:
          {prodbarcode: product.item.barcode}});
  }

  checkRemark(product){
    return this.cartService.checkRemarks(product);
  }
}
