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
import {UserRecordService} from '../user-record.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute,
              private router: Router, private cartService: CartService, public popoverController: PopoverController,
              private barcodeScanner: BarcodeScanner, public modalController: ModalController, public toastController: ToastController,
              public pickerCtrl: PickerController, private userRecordService: UserRecordService,
              public loadingController: LoadingController) {
    this.route.queryParams.subscribe(params => {
      this.types = params['type'];
      console.log(this.types);
      this.keywords = params['keywords'];
      console.log(this.keywords);
    });
  }
  keywords = '';
  items: Item[] = [];
  fitems: Item[];
  error = '';
  success = '';
  itemd: string;
  selected: Item;
  brand = [];
  types = [];
  ffitems: Item[] = [];
  fffitems: Item[] = [];
  modeldata = [];
  displayPrice = false;
  displayBrand = false;
  sortfitem: Item[];


  ngOnInit(): void {
    this.presentLoading().then(() => {
    this.items = this.itemservice.getItemList();
    this.filter();
    console.log(this.types);
    });
  }

  filter() {
    this.fitems = [];
    if (this.keywords !== undefined) {
      for (const item of this.items) {
        this.itemd = item.brand_en + ' ' + item.brand_tc + ' ' + item.type_en + ' ' + item.type_tc + ' ' +item.name_tc + ' ' + item.name_en;
        if (this.itemd.toString().toLowerCase().includes(this.keywords.toLowerCase()) || item.barcode === this.keywords) {
          this.fitems.push(item);
        }
      }
    } else {
      for (const item of this.items) {
        if (this.types.includes(item.type_tc)) {
          this.fitems.push(item);
        }
      }
    }
    this.sortfitem = this.fitems;
    console.log(this.sortfitem);
    this.loadingController.dismiss();
  }

  onSelect(fitem: Item) {
    this.userRecordService.recordAction('view', fitem.barcode);
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
    this.userRecordService.recordAction('search', value);
    this.keywords = value;
    this.filter();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.keywords = barcodeData.text;
      this.userRecordService.recordAction('scan', this.keywords);
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
            if (data.list.value === 'price') {
              this.sortPrice();
            }
            if (data.list.value === 'brand') {
              this.sortBrand();
            }
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
              value: 'brand'
            }
          ]
        }
      ]
    });
    await picker.present();
  }
  sortPrice() {
    this.fitems = this.fitems.sort(function (obj1 , obj2) {
      return obj1['minPrice'][0].price - obj2['minPrice'][0].price;
    });
    console.log(this.fitems);
  }
  sortBrand() {
    this.fitems = this.fitems.sort((obj1 , obj2) => (
        obj1.brand_tc > obj2.brand_tc ? -1 : 1
    ));
    console.log(this.fitems);
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
        console.log(model.data);
        this.modeldata = [];
        this.modeldata = model.data;
        console.log(this.modeldata);
        this.addfilter();
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
  addfilter() {
    this.ffitems = [];
    this.fffitems = [];
    this.fitems = this.sortfitem;
    console.log(this.fitems);
    if (this.modeldata[0] !== undefined || this.modeldata[1] !== undefined) {
      for (const fitem of this.fitems) {
        if ( fitem['minPrice'][0].price > this.modeldata[0] &&
            fitem['minPrice'][0].price < this.modeldata[1] ) {
          this.ffitems.push(fitem);
        }
        this.displayPrice = true;
      }
    } else {
      this.ffitems = this.fitems;
      this.displayPrice = false;
    }
    console.log(this.ffitems);
    const filterbrand = this.modeldata[2];
    console.log(filterbrand.length);
    if (filterbrand.length !== 0 ) {
      this.displayBrand = true;
      for (const ffitem of this.ffitems) {
        if (filterbrand.includes(ffitem.brand_tc)) {
          this.fffitems.push(ffitem);
        }
      }
    } else {
      this.fffitems = this.ffitems;
      this.displayBrand = false;
    }
    console.log(this.fffitems);
    this.fitems = this.fffitems;
  }
  delprice() {
    this.modeldata = this.modeldata.fill(undefined, 0, 2);
    console.log(this.modeldata);
    this.addfilter();
  }
  delbrand(filbrand: any) {
    console.log(this.modeldata);
    this.modeldata[2] = this.modeldata[2].filter(brand => brand !== filbrand);
    console.log(this.modeldata);
    this.addfilter();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '請稍候..正在下載資料',
    });
    await loading.present();
  }
}
