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
    prodbarcode: string;
    prodinType: Item[];
    recommend: Item[];
    num: number[];


    constructor(private itemservice: ItemService, private cartservice: CartService,
                private route: ActivatedRoute, public popoverController: PopoverController) {
        this.route.queryParams.subscribe(params => {
            this.prodbarcode = params['prodbarcode'];
        });
    }

    ngOnInit(): void {
        this.getItems();
    }

    getItems() {
        this.prodinType = [];
        this.recommend = [];
        this.num = [0, 1, 2, 3, 4];
        this.items = this.itemservice.getItemList();
        this.InitItems();
        this.getprodinType();
        for (let i = 0; i <= 4; i++) {
            this.recommend[i]['sorted'] = this.sortPrice(this.recommend[i]);
            console.log(this.recommend[i]);
        }
    }

    InitItems(): void {
        this.display = this.items.find(x => x.barcode === this.prodbarcode);
        this.display['sorted'] = this.sortPrice(this.display);
        console.log(this.display);
    }

    getprodinType(): void {
        this.prodinType = this.items.filter(x => x.type_tc === this.display.type_tc);
        console.log(this.prodinType);
        this.randomItems();
    }

    randomItems(): void {
        /*let arr = [];
        while (arr.length < 5) {
            let r = Math.floor(Math.random() * this.prodinType.length);
            if (arr.indexOf(r) === -1) {arr.push(r); }
        }*/
        for (let i = 0; i < 5; i++) {
            this.recommend[i] = this.prodinType[i];
        }
    }

    sortPrice(itemm: Item) {
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
