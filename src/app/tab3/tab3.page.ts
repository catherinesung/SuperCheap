import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private router: Router) { }
  Searchdrinks() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'drinks'}});
  }
  Searchfood() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'food'}});
  }
  Searchgrocery() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'grocery'}});
  }
  Searchwine() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'wine'}});
  }
  Searchskin() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'skin'}});
  }
  Searchbaby() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'baby'}});
  }
  Searchclean() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'clean'}});
  }
  Searchfrozen() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'frozen'}});
  }
  Searchpet() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'pet'}});
  }
  Searchhouseware() {
    this.router.navigate(['/result'], {queryParams: { keywords: 'houseware'}});
  }
}
