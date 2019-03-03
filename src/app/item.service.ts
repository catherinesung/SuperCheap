import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ITEMS} from './Items';
import {Item} from './Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }
  getItems(): Observable<Item[]> {
    return of(ITEMS);
  }
}
