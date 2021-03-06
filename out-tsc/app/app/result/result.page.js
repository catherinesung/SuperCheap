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
import { ActivatedRoute } from '@angular/router';
import { ITEMS } from '../Items';
import { fitems } from '../fitems';
var ResultPage = /** @class */ (function () {
    function ResultPage(route) {
        var _this = this;
        this.route = route;
        this.items = ITEMS;
        this.fitems = fitems;
        console.log('Called Constructor');
        this.route.queryParams.subscribe(function (params) {
            _this.keywords = params['keywords'];
        });
    }
    ResultPage.prototype.ngOnInit = function () {
        this.fitems = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.name === this.keywords) {
                this.fitems.push(item);
            }
            else if (item.id.toString() === this.keywords) {
                this.fitems.push(item);
            }
            else if (item.category.toString() === this.keywords) {
                this.fitems.push(item);
            }
        }
    };
    ResultPage = __decorate([
        Component({
            selector: 'app-result',
            templateUrl: './result.page.html',
            styleUrls: ['./result.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute])
    ], ResultPage);
    return ResultPage;
}());
export { ResultPage };
//# sourceMappingURL=result.page.js.map