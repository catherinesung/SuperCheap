import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
@NgModule({
  imports: [
    FormsModule
  ]})
  export class Tab2Page {
  constructor(private router: Router) { }
  Search(value: string) {
    this.router.navigate(['/result'], {queryParams: { keywords: value}});
      }
    }
