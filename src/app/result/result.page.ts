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
  public ngOnInit() {
    /*this.fitems = [];
    for (const item of this.items) {
      if (item.name === this.keywords) {
        this.fitems.push(item);
      } else if (item.id.toString() === this.keywords) {
        this.fitems.push(item);
      } else if (item.category.toString() === this.keywords) {
        this.fitems.push(item);
      }
    }*/
}
  constructor(private route: ActivatedRoute) {console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }



}
