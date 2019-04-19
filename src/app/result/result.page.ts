import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import {PopoverController, ToastController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import {ResultfilterComponent} from '../resultfilter/resultfilter.component';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute, public alertController: AlertController,
              private router: Router, private cartService: CartService, public popoverController: PopoverController,
              private barcodeScanner: BarcodeScanner, public modalController: ModalController, public toastController: ToastController ) {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }
  keywords: string;
  items: Item[] = [];
  fitems: Item[];
  error = '';
  success = '';
  itemd: string;
  selected: Item;


  ngOnInit(): void {
    this.items = this.itemservice.getItemList();
    this.filter();
  }

  filter() {
    this.fitems = [];
      for (const item of this.items) {
        this.itemd = item.brand_en + ' ' + item.brand_tc + ' ' + item.type_en + ' ' + item.type_tc;
        if (this.itemd.toString().toLowerCase().includes(this.keywords.toLowerCase()) || item.barcode === this.keywords) {
          item['minPrice'] = this.cartService.comparePrice(item);
          this.fitems.push(item);
          console.log(this.fitems);
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
      showBackdrop: true
    });

    await popover.present();
    const model = await popover.onDidDismiss();

    switch (model.role) {
      case 'confirm':
        this.cartService.addProduct(fitem, Number(model.data[1]), model.data[0]);
        console.log('confirm' + model.data[0] + model.data[1]);
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

  async showfilter() {
    const showfilter = await this.modalController.create({
      component: ResultfilterComponent,
      componentProps: {
        'fitem': this.fitems
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
}
