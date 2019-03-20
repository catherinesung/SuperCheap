var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
var Tab1PageModule = /** @class */ (function () {
    function Tab1PageModule(platform, splashScreen, statusBar, barcodeScanner) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.barcodeScanner = barcodeScanner;
        this.initializeApp();
    }
    Tab1PageModule.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    Tab1PageModule.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            alert('Barcode data ' + JSON.stringify(barcodeData));
            _this.scannedData = barcodeData;
        }).catch(function (err) {
            console.log('Error', err);
        });
    };
    Tab1PageModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: Tab1Page }])
            ],
            declarations: [Tab1Page]
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            BarcodeScanner])
    ], Tab1PageModule);
    return Tab1PageModule;
}());
export { Tab1PageModule };
//# sourceMappingURL=tab1.module.js.map