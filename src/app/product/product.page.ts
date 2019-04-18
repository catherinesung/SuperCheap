import {Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
    items: Item[];
    display: Item;
    recommend: Item[];
    prodbarcode: string;
    recommendcode: string[];
    num: number[];


    constructor(private itemservice: ItemService, private cartservice: CartService,
                private route: ActivatedRoute, public popoverController: PopoverController) {
        this.route.queryParams.subscribe(params => {
            this.prodbarcode = params['prodbarcode'];
            this.recommendcode = params['recommend'];
        });
    }

    ngOnInit(): void {
        this.getItems();
        console.log(this.recommendcode);
        this.num = [0, 1, 2, 3, 4];
        console.log(this.num);
    }

    sortprice(itemm: Item) {
        let supermarketarr = ['parknshop', 'wellcome', 'marketplace', 'aeon', 'dch', 'waston'];
        let pricearr = [itemm.price_wellcome, itemm.price_parknshop, itemm.price_marketplace, itemm.price_aeon, itemm.price_dch,
            itemm.price_waston];
        const currformat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        let sorted = [];
        for (let i = 0; i < 6; i++) {
            let min = 9999;
            let num = -1;
            for (let j = 0; j < 6; j++) {
                if ((pricearr[j] !== 0) && (pricearr[j] < min)) {
                    min = pricearr[j];
                    num = j;
                }
            }
            if (num !== -1) {
                sorted.push([supermarketarr[num], currformat.format(pricearr[num])]);
                pricearr[num] = 0;
            }
        }
        return sorted;
    }

    getItems() {
        this.items = this.itemservice.getItemList();
        this.recommend = this.items;
        this.InitItems();
    }

    InitItems(): void {
        this.display = this.items.find(x => x.barcode === this.prodbarcode);
        console.log(this.display);
        this.display['sorted'] = this.sortprice(this.display);
        console.log(this.display['sorted']);
        for (let i in this.recommendcode) {
            this.recommend[i] = this.items.find(x => x.barcode === this.recommendcode[i]);
            console.log(this.recommend[i]);
            this.recommend[i]['sorted'] = this.sortprice(this.recommend[i]);
            console.log(this.recommend[i]['sorted']);
        }
    }

    async popOver(itemm: Item) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            componentProps: {
                'fitem': itemm
            },
            backdropDismiss: false,
            animated: true,
            showBackdrop: true
        });

        await popover.present();
        const model = await popover.onDidDismiss();

        switch (model.role) {
            case 'confirm':
                this.cartservice.addProduct(itemm, Number(model.data[1]), model.data[0]);
                console.log('confirm' + model.data[0] + model.data[1]);
                break;
            case 'fail':
                console.log('fail');
                break;
        }
    }
}
