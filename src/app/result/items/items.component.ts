import { Component, OnInit } from '@angular/core';
import {ITEMS} from '../../Items';
import {Item} from '../../Item';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items = ITEMS;
  selectedItem: Item;
  ngOnInit() {
  }
  onSelect(item: Item): void {
    this.selectedItem = item;
  }

}
