import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ITEMS} from '../Items';
import {fitems} from '../fitems';
import {Item} from '../item';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  keywords: string;
  items = ITEMS;
  fitems = fitems;
  items_details: string;
  public ngOnInit() {
    this.fitems = [];
    for (const item of this.items) {
      this.items_details = item.name + ' ' + item.category;
      if (this.items_details.toLowerCase().toString().includes(this.keywords.toLowerCase())) {
        this.fitems.push(item);
      }
    }
}
  constructor(private route: ActivatedRoute) {console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }
}
