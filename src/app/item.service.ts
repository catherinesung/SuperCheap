import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item } from './item';
import {CartService} from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseurl = 'http://www-std.se.cuhk.edu.hk/~fyp_r18';
  items: Item[] = [];

  constructor(private http: HttpClient, public cartService: CartService) {
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error in getting items');
  }

  calRemark(remark_en: string, price: number) {
      let amount = -1;
      let value = -1;
      if (remark_en !== null) {
          if (remark_en.includes(' at $')) {
              const buyend = remark_en.indexOf(' at $');
              const buystart = remark_en.lastIndexOf('Buy ', buyend) + 4;
              const buy = Number(remark_en.substring(buystart, buyend));
              const atstart = buyend + 5;
              const atend = remark_en.indexOf(' ', atstart);
              const at = Number(remark_en.substring(atstart, atend));
              amount = buy;
              value = at;
          } else if (remark_en.includes(' to save $')) {
              const buyend = remark_en.indexOf(' at $');
              const buystart = remark_en.lastIndexOf('Buy ', buyend) + 4;
              const buy = Number(remark_en.substring(buystart, buyend));
              const atstart = buyend + 10;
              const atend = remark_en.indexOf(' ', atstart);
              const at = price * buy - Number(remark_en.substring(atstart, atend));
              amount = buy;
              value = Number(at.toFixed(1));
          } else if (remark_en.includes(' free (')) {
              const atend = remark_en.indexOf(' free (');
              const buystart = remark_en.lastIndexOf('Buy ', atend) + 4;
              const buyend = remark_en.lastIndexOf(' get ', atend);
              const buy = Number(remark_en.substring(buystart, buyend));
              const atstart = buyend + 5;
              const at = Number(remark_en.substring(atstart, atend));
              amount = buy;
              value = at;
          } else if (remark_en.includes(' for $')) {
              const buystart = 0;
              const buyend = remark_en.indexOf(' for $');
              const buy = Number(remark_en.substring(buystart, buyend));
              const atstart = buyend + 6;
              const atend = remark_en.indexOf(' ', atstart);
              const free = Number(remark_en.substring(atstart, atend));
              const at = price * buy;
              amount = buy + free;
              value = Number(at.toFixed(1));
          } else if (remark_en.includes(' (Average @ $')) {
              const buystart = remark_en.indexOf('Buy ') + 4;
              const buyend = remark_en.indexOf(' ', buystart);
              const buy = Number(remark_en.substring(buystart, buyend));
              const atstart = remark_en.indexOf(' (Average @ $') + 13;
              const atend = remark_en.indexOf(')', atstart);
              const at = buy * Number(remark_en.substring(atstart, atend));
              amount = buy;
              value = Number(at.toFixed(1));
          }
      }
      if ((isNaN(amount)) || (isNaN(value))) {
          amount = -1;
          value = -1;
      }
      return [amount, value];
  }

  getAll(): Observable<Item[]> {
    return this.http.get(`${this.baseurl}/item.php`).pipe(
        map((res) => {
          this.items = res['data'];
          for (let i of this.items) {
              i.price_parknshop = Number(i.price_parknshop);
              i.price_wellcome = Number(i.price_wellcome);
              i.price_marketplace = Number(i.price_marketplace);
              i.price_aeon = Number(i.price_aeon);
              i.price_dch = Number(i.price_dch);
              i.price_waston = Number(i.price_waston);
          }
          return this.items;
        }),
        catchError(this.handleError));
  }
    getItems(): void {
        this.getAll().subscribe(
            (res: Item[]) => {
                this.items = res;
                for (const item of this.items) {
                    item['minPrice'] = this.cartService.comparePrice(item);
                    item.remark_aeon = this.calRemark(item.remark_en_aeon, item.price_aeon);
                    item.remark_dch = this.calRemark(item.remark_en_dch, item.price_dch);
                    item.remark_marketplace = this.calRemark(item.remark_en_marketplace, item.price_marketplace);
                    item.remark_parknshop = this.calRemark(item.remark_en_parknshop, item.price_parknshop);
                    item.remark_waston = this.calRemark(item.remark_en_waston, item.price_waston);
                    item.remark_wellcome = this.calRemark(item.remark_en_wellcome, item.price_wellcome);
                }
            }
        );
    }

    getItemList() {
      console.log(this.items);
      return this.items;
    }
}
