var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ITEMS } from './Items';
var CartService = /** @class */ (function () {
    function CartService() {
        /*private data = [
          {id: 0, name: 'product1', price: '8'},
          {id: 1, name: 'product1', price: '8'},
          {id: 2, name: 'product1', price: '8'}
        ];*/
        this.data = ITEMS;
        this.cart = [];
    }
    CartService.prototype.getProducts = function () {
        return this.data;
    };
    CartService.prototype.getCart = function () {
        return this.cart;
    };
    CartService.prototype.addProduct = function (product) {
        this.cart.push(product);
    };
    CartService.prototype.solutionPricePerProduct = function () {
        var product, supermarket;
        var supermarketList = ['price_a', 'price_b', 'price_c', 'price_d', 'price_e', 'price_f', 'price_g'];
        for (var _i = 0, _a = this.cart; _i < _a.length; _i++) {
            product = _a[_i];
            var minPrice = 99999;
            var minPriceList = [];
            for (var _b = 0, supermarketList_1 = supermarketList; _b < supermarketList_1.length; _b++) {
                supermarket = supermarketList_1[_b];
                if (product[supermarket] < minPrice) {
                    minPrice = product[supermarket];
                    console.log(minPrice);
                    minPriceList.push(supermarket);
                }
                else if (product[supermarket] = minPrice) {
                    minPriceList.push(supermarket);
                }
            }
            console.log(minPriceList);
        }
    };
    CartService.prototype.solutionPricePerSupermarket = function () {
    };
    CartService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], CartService);
    return CartService;
}());
export { CartService };
//# sourceMappingURL=cart.service.js.map