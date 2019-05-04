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

  calRemark(remark_en: string) {
      if ((remark_en !== null) && (remark_en.includes(' at $'))) {
          const buyend = remark_en.indexOf(' at $');
          const buystart = remark_en.lastIndexOf('Buy ', buyend) + 4;
          const buy = Number(remark_en.substring(buystart, buyend));
          const atstart = buyend + 5;
          const atend = remark_en.indexOf(' ', atstart);
          const at = Number(remark_en.substring(atstart, atend));
          return [buy, at];
      } else {return [-1, -1]; }
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
                    item.remark_aeon = this.calRemark(item.remark_en_aeon);
                    item.remark_dch = this.calRemark(item.remark_en_dch);
                    item.remark_marketplace = this.calRemark(item.remark_en_marketplace);
                    item.remark_parknshop = this.calRemark(item.remark_en_parknshop);
                    item.remark_waston = this.calRemark(item.remark_en_waston);
                    item.remark_wellcome = this.calRemark(item.remark_en_wellcome);
                }
            }
        );
    }

    getItemList() {
      console.log(this.items);
      return this.items;
    }
}
