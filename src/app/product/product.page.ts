import {Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
    items: Item[];
    display: Item;
    prodbarcode: string;
    sorted: [string, number][];

    constructor(private itemservice: ItemService, private cartservice: CartService,
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.prodbarcode = params['prodbarcode'];
            console.log(params['prodbarcode']);
        });
    }

    ngOnInit(): void {
        this.getItems(this.prodbarcode);
    }

    sortprice(itemm: Item) {
        let supermarketarr = ['wellcome', 'parknshop', 'marketplace', 'aeon', 'dch', 'waston'];
        let pricearr = [itemm.price_wellcome, itemm.price_parknshop, itemm.price_marketplace, itemm.price_aeon, itemm.price_dch,
            itemm.price_waston];
        let sorted = [];
        for (let i = 0; i < 6; i++) {
            let min = 9999;
            let num = -1;
            for (let j = 0; j < 6; j++) {
                if ((pricearr[j] != null) && (pricearr[j] < min)) {
                    min = pricearr[j];
                    num = j;
                }
            }
            if (num !== -1) {
                sorted.push([supermarketarr[num], pricearr[num]]);
                pricearr[num] = null;
            }
        }
        return sorted;
    }

    getItems(prodbarcode: string): void {
        this.itemservice.getAll().subscribe((res: Item[]) => {
            this.items = res;
            this.display = this.items.find(x => x.barcode === prodbarcode);
            this.sorted = this.sortprice(this.display);
            console.log(this.sorted);
        });
    }
}
