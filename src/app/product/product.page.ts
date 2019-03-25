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
  display: Item;
  error = '';
  success = '';

  ngOnInit(): void {
    this.getItems('0000021930041');
  }

  getItems(key: string): void {
    this.itemservice.getAll().subscribe(
        (res: Item[]) => {
          this.items = res;
          this.display = this.items.find(x => x.barcode === key);
          console.log(this.display);
        },
        (err) => {
          this.error = err;
        }
    );
  }
}
