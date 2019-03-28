import {Component, OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import {Item} from '../item';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  constructor(private itemservice: ItemService, private route: ActivatedRoute, private router: Router) {
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
          this.display = this.items.find(x => x.barcode === this.keywords);
          console.log(this.display);
        },
        (err) => {
          this.error = err;
        }
    );
  }
  view() {
    this.router.navigate(['product'], { queryParams: { probarcode: this.display.barcode}});
  }
}
