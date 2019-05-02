import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import {PopoverController, ToastController} from '@ionic/angular';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import {ResultfilterComponent} from '../resultfilter/resultfilter.component';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute,
              private router: Router, private cartService: CartService, public popoverController: PopoverController,
              private barcodeScanner: BarcodeScanner, public modalController: ModalController, public toastController: ToastController,
              public pickerCtrl: PickerController) {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords'];
    });
  }
  keywords: string;
  items: Item[] = [];
  fitems: Item[];
  error = '';
  success = '';
  itemd: string;
  selected: Item;
  brand = [];


  ngOnInit(): void {
    this.items = this.itemservice.getItemList();
    console.log(this.items);
    this.filter();
  }

  filter() {
    this.fitems = [];
      for (const item of this.items) {
        this.itemd = item.brand_en + ' ' + item.brand_tc + ' ' + item.type_en + ' ' + item.type_tc;
        if (this.itemd.toString().toLowerCase().includes(this.keywords.toLowerCase()) || item.barcode === this.keywords) {
          this.fitems.push(item);
        }
      }
    }

  onSelect(fitem: Item) {
  this.router.navigate(['/tabs/tab3/result/product'], { queryParams:
        {prodbarcode: fitem.barcode}});
  }

  async popOver(fitem: Item) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        'fitem': fitem
      },
      backdropDismiss: false,
      animated: true,
      showBackdrop: true,
      cssClass: 'resultPopOver'
    });

    await popover.present();
    const model = await popover.onDidDismiss();

    switch (model.role) {
      case 'confirm':
        this.cartService.addProduct(fitem, Number(model.data[1]), model.data[0]);
        /*const alert = await this.alertController.create({
          message: model.data[1] + '件' + fitem.name_tc + '已加入購物車',
          buttons: ['OK']
        });*/
        this.presentToast(model.data[1] + '件' + fitem.brand_tc + fitem.name_tc + '已加入購物車', 2000);

        break;
      case 'fail':
        console.log('fail');
        break;
    }
  }

  Search(value: string) {
   this.keywords = value;
   this.filter();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.keywords = barcodeData.text;
      this.filter();
    }).catch(err => {
      console.log('Error', err);
    });
  }
  async sortItem() {
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log(data.list.value);
          }
        },
        {
          text: '確定',
          role: 'done',
          handler: data => {
            console.log(data.list.value);
            this.keywords = data.list.value;
            this.filter();
          }
        }
      ],
      columns: [
        {
          name: 'list',
          options: [
            {
              text: '請選擇排序方式',
              value: ' '
            },
            {
              text: '按價錢排序',
              value: 'price'
            },
            {
              text: '按品牌排序',
              value: 'marketplace'
            }
          ]
        }
      ]
    });
    await picker.present();

  }

  async showfilter() {
    for (const fitem of this.fitems) {
      if (this.brand.includes(fitem.brand_tc)) {
      } else {this.brand.push(fitem.brand_tc); }
    }
    console.log(this.brand);
    const showfilter = await this.modalController.create({
      component: ResultfilterComponent,
      componentProps: {
        brands: this.brand
      },
      backdropDismiss: false,
      animated: true,
      showBackdrop: true
    });

    await showfilter.present();
    const model = await showfilter.onDidDismiss();

    switch (model.role) {
      case 'confirm':
        const ffitems = this.fitems;
        this.fitems = [];
        for (const ffitem of ffitems) {
          if (ffitem.brand_tc === model.data[0] && ffitem.price_parknshop < model.data[2] && ffitem.price_parknshop > model.data[1]) {
            this.fitems.push(ffitem);
          }
        }
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
  imageLoaded(event) {
    // Register the onerror event on the image in case of a 404
    const img = event.srcElement.shadowRoot.children[1];
    img.onerror = () => { img.src = '/assets/product-img/no-image.jpg'; };
    event.srcElement.className = event.srcElement.className.replace('image-loading', '');
  }
}
