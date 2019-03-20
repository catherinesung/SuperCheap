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
import { Router } from '@angular/router';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(router) {
        this.router = router;
    }
    Tab3Page.prototype.Searchdrinks = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'drinks' } });
    };
    Tab3Page.prototype.Searchfood = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'food' } });
    };
    Tab3Page.prototype.Searchgrocery = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'grocery' } });
    };
    Tab3Page.prototype.Searchwine = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'wine' } });
    };
    Tab3Page.prototype.Searchskin = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'skin' } });
    };
    Tab3Page.prototype.Searchbaby = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'baby' } });
    };
    Tab3Page.prototype.Searchclean = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'clean' } });
    };
    Tab3Page.prototype.Searchfrozen = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'frozen' } });
    };
    Tab3Page.prototype.Searchpet = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'pet' } });
    };
    Tab3Page.prototype.Searchhouseware = function () {
        this.router.navigate(['/result'], { queryParams: { keywords: 'houseware' } });
    };
    Tab3Page = __decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        __metadata("design:paramtypes", [Router])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map