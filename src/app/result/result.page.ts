import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import { AlertController } from '@ionic/angular';
import {strings} from '@angular-devkit/core';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute,
              private router: Router, private cartService: CartService, public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }
  keywords: string;
  fitems: Item[] = [];
  items: Item[];
  display: Item;
  error = '';
  success = '';
  itemd: string;
  selected: Item;
  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemservice.getAll().subscribe(
        (res: Item[]) => {
          this.items = res;
          this.fitems = [];
          for (const item of this.items) {
            this.itemd = item.brand_en + ' ' + item.brand_tc + ' ' + item.type_en + ' ' + item.type_tc;
            if (this.itemd.toString().toLowerCase().includes(this.keywords.toLowerCase()) || item.barcode === this.keywords) {
              this.fitems.push(item);
            }
          }
        },
        (err) => {
          this.error = err;
        }
    );
  }
    onSelect(fitem: Item) {
    this.router.navigate(['/product'], { queryParams: { prodbarcode: fitem.barcode}});
  }
  addtocart(fitem: Item) {
    this.cartService.addProduct(fitem, 2);
  }

  async presentAlert(fitem: Item) {
    console.log(fitem);
    const alert = await this.alertController.create({
      inputs: [
        {
          name: '百佳',
          type: 'radio',
          label: '百佳' + fitem.price_parknshop,
          value: 'price_parknshop' ,
          checked: true
        },

        {
          name: '惠康',
          type: 'radio',
          label: '惠康',
          value: 'price_wellcome'
        },

        {
          name: 'marketplace',
          type: 'radio',
          label: 'marketplace',
          value: 'price_marketplace'
        },

        {
          name: 'Aeon',
          type: 'radio',
          label: 'Aeon',
          value: 'price_aeon'
        },

        {
          name: '屈臣氏',
          type: 'radio',
          label: '屈臣氏',
          value: 'remark_tc_waston'
        },

        {
          name: '大昌行',
          type: 'radio',
          label: '大昌行',
          value: 'remark_tc_dch'
        }
      ],
      buttons: ['cancel', 'OK' ]
    });

    await alert.present();
  }

}
