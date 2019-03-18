var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { ITEMS } from '../../Items';
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent() {
        this.items = ITEMS;
    }
    ItemsComponent.prototype.ngOnInit = function () {
    };
    ItemsComponent.prototype.onSelect = function (item) {
        this.selectedItem = item;
    };
    ItemsComponent = __decorate([
        Component({
            selector: 'app-items',
            templateUrl: './items.component.html',
            styleUrls: ['./items.component.scss']
        })
    ], ItemsComponent);
    return ItemsComponent;
}());
export { ItemsComponent };
//# sourceMappingURL=items.component.js.map