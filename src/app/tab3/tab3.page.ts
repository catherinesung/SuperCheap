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
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'drinks'}});
  }
  Searchfood() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'food'}});
  }
  Searchgrocery() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'grocery'}});
  }
  Searchwine() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'wine'}});
  }
  Searchskin() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'skin'}});
  }
  Searchbaby() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'baby'}});
  }
  Searchclean() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'clean'}});
  }
  Searchfrozen() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'frozen'}});
  }
  Searchpet() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'pet'}});
  }
  Searchhouseware() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { keywords: 'houseware'}});
  }
}
