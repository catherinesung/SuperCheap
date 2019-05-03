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
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: [ '果汁類飲品' , '咖啡 / 茶包 / 奶茶 / 鴛鴦']}});
  }
  Searchfood() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams:
          { type: ['新鮮蔬菜', '冰鮮/新鮮肉類 新鮮水果']}});
  }
  Searchgrocery() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['烘焙用料 / 麵粉', '食用油 / 煮食油',
              '調味 / 煮食用料', '蜂蜜 / 蜜糖 / 糖漿罐頭食品', '米', '餅乾',
              '能量棒 / 營養棒 / 點心棒', '糖果 / 甜品', '小食', '麵包醬']}});
  }
  Searchwine() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['啤酒']}});
  }
  Searchskin() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['皮膚護理']}});
  }
  Searchbaby() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['嬰幼兒食品 / 嬰兒食品 / 幼兒食品']}});
  }
  Searchclean() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['清潔用品']}});
  }
  Searchfrozen() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['急凍海產', '急凍加工食品 / 冷藏加工食品']}});
  }
  Searchpet() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['pet']}});
  }
  Searchhouseware() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams: { type: ['紙品', '保鮮紙 / 食物袋 / 錫紙']}});
  }
}
