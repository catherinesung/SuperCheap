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
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(router) {
        this.router = router;
    }
    Tab2Page.prototype.Search = function (value) {
        this.router.navigate(['/result'], { queryParams: { keywords: value } });
    };
    Tab2Page = __decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        NgModule({
            imports: [
                FormsModule
            ]
        }),
        __metadata("design:paramtypes", [Router])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map