import {Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  constructor(private itemservice: ItemService) {
  }

  items: Item[];
  display: string;
  error = '';
  success = '';

  ngOnInit(): void {
    this.getItems();
    this.display = this.items.find(x => x.barcode === '0000021072758').brand_en;
  }

  getItems(): void {
    this.itemservice.getAll().subscribe(
        (res: Item[]) => {
          this.items = res;
        },
        (err) => {
          this.error = err;
        }
    );
  }
}
