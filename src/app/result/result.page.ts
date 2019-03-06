import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage {
  keywords: string;
  constructor(private route: ActivatedRoute) {console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
      this.keywords = params['keywords']; });
  }
}
