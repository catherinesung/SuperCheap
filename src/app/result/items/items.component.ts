import { Component, OnInit } from '@angular/core';
import {ITEMS} from '../../Items';
import {Item} from '../../Item';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items = ITEMS;
  selectedItem: Item;
  constructor() { }

  ngOnInit() {}
  onSelect(item: Item): void {
    this.selectedItem = item;
  }

}
