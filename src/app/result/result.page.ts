import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute, public alertController: AlertController,
              private router: Router, private cartService: CartService, public popoverController: PopoverController,
              private barcodeScanner: BarcodeScanner) {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }
  keywords: string;
  fitems: Item[] = [];
  items: Item[];
  error = '';
  success = '';
  itemd: string;
  selected: Item;
  recommend = [];
  minprice = [];
  i = 0;

  ngOnInit(): void {
    this.getItems();
    }

  getItems(): void {
    this.itemservice.getAll().subscribe(
        (res: Item[]) => {
          this.items = res;
          this.filter();
        },
        (err) => {
          this.error = err;
        }
    );
  }
    filter() {
    this.fitems = [];
      for (const item of this.items) {
        this.itemd = item.brand_en + ' ' + item.brand_tc + ' ' + item.type_en + ' ' + item.type_tc;
        if (this.itemd.toString().toLowerCase().includes(this.keywords.toLowerCase()) || item.barcode === this.keywords) {
          this.fitems.push(item);
          this.recommend.push(item.barcode);
        }
      }
    }
    onSelect(fitem: Item) {
    this.router.navigate(['/product'], { queryParams:
          { prodbarcode: fitem.barcode,
            recommend: this.recommend.slice( 1 , 6 )}});
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
        const alert = await this.alertController.create({
          message: model.data[1] + '件' + fitem.name_tc + '已加入購物車',
          buttons: ['OK']
        });

        await alert.present();
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
}
