import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute,
              private router: Router, private cartService: CartService, public popoverController: PopoverController) {
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
        const output: string[] = [model.data[0], model.data[1]];
        this.cartService.addProduct(fitem, Number(output[0]), output[1]);
        console.log('confirm');
        break;
      case 'fail':
        console.log('fail');
        break;
    }

  }
}
