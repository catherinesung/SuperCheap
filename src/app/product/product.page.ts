import {Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(private itemservice: ItemService) {
  }

  items: Item[];
  display: Item;
  error = '';
  success = '';
  prodbarcode: string;
  prodbarcode = '0000021930041';
  ngOnInit(): void {
    this.getItems('0000021930041');
  }
    constructor(private itemservice: ItemService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.prodbarcode = '089782040015'; });
    }

    ngOnInit(): void {
        this.getItems(this.prodbarcode);
    }

    getItems(prodbarcode: string): void {
        this.itemservice.getAll().subscribe(
            (res: Item[]) => {
            this.items = res;
            this.display = this.items.find(x => x.barcode === prodbarcode);
            console.log(this.display);
            }
        );
    }
}
