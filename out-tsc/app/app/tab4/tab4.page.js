var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
var Tab4Page = /** @class */ (function () {
    function Tab4Page(cartService, router) {
        this.cartService = cartService;
        this.router = router;
        this.cart = [];
        this.items = [];
    }
    Tab4Page.prototype.ngOnInit = function () {
        this.cartService.addProduct({ id: 1, name: 'product1', price_a: '8', price_b: '9', price_c: '10', price_d: '11', price_e: '12', price_f: '13', price_g: '14' });
        this.cartService.addProduct({ id: 2, name: 'product2', price_a: '4', price_b: '5', price_c: '6', price_d: '7', price_e: '8', price_f: '9', price_g: '10' });
        this.cart = this.cartService.getCart();
        this.items = this.cartService.getProducts();
        console.log(this.cart);
        this.cartService.solutionPricePerProduct();
    };
    Tab4Page = __decorate([
        Component({
            selector: 'app-tab4',
            templateUrl: 'tab4.page.html',
            styleUrls: ['tab4.page.scss']
        }),
        __metadata("design:paramtypes", [CartService, Router])
    ], Tab4Page);
    return Tab4Page;
}());
export { Tab4Page };
//# sourceMappingURL=tab4.page.js.map