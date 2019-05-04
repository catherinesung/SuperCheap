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
        {queryParams: { type: [ '果汁類飲品' , '咖啡 / 茶包 / 奶茶 / 鴛鴦', '麥片飲品 / 麥芽飲品 / 朱古力飲品',
              '東方特色飲品', '樽裝水 / 運動飲品 /  能量飲品', '牛奶 / 牛奶飲品', '汽水', '豆漿 / 豆奶 / 即沖豆漿']}});
  }
  Searchfood() {
    this.router.navigate(['/tabs/tab3/result'], {queryParams:
          { type: ['新鮮蔬菜', '冰鮮/新鮮肉類 新鮮水果', '蛋類']}});
  }
  Searchgrocery() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['烘焙用料 / 麵粉', '食用油 / 煮食油',
              '調味 / 煮食用料', '蜂蜜 / 蜜糖 / 糖漿罐頭食品', '米', '餅乾',
              '能量棒 / 營養棒 / 點心棒', '糖果 / 甜品', '小食', '麵包醬', '穀類早餐',
              '乾果', '非即食中式粉麵 / 日式粉麵', '烏冬麵', '麵包', '蛋糕', '豆腐製品', '豆腐製品', '非即食意式粉麵', '無菌包裝食品']}});
  }
  Searchwine() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['啤酒', '米酒', '紹興酒', '白酒', '紅酒', '仙地']}});
  }
  Searchskin() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['皮膚護理', '男士護理', '沐浴露 / 皂液 / 肥皂', '頭髮護理', '口腔護理', '止汗/香體用品',
          '女士衛生用品', '女士脫毛用品 / 除毛用品', '手部殺菌消毒', '濕巾']}});
  }
  Searchbaby() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['嬰幼兒食品 / 嬰兒食品 / 幼兒食品', '嬰幼兒奶粉 / 兒童奶粉', '嬰兒用品']}});
  }
  Searchclean() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['清潔用品', '洗衣用品']}});
  }
  Searchfrozen() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['急凍海產', '急凍加工食品 / 冷藏加工食品', '急凍肉類', '冰凍甜點' ,
          '芝士 / 乳酪 / 乳酸產品', '忌廉', '急凍蔬菜']}});
  }
  Searchpet() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['寵物用品', '寵物食品']}});
  }
  Searchhouseware() {
    this.router.navigate(['/tabs/tab3/result'],
        {queryParams: { type: ['紙品', '保鮮紙 / 食物袋 / 錫紙', '避孕', '急救用品', '醫療設備',
              '成人紙尿片 / 紙尿褲', '保健食品 / 營養補充劑', '電池', '衛生防護用品', '吸濕防霉', '電器']}});
  }
}
