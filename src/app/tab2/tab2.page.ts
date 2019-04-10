import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
/*import {
    NativeGeocoderForwardResult,
    NativeGeocoder,
} from '@ionic-native/native-geocoder';*/

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    constructor(private locationService: LocationService, /*private nativeGeocoder: NativeGeocode*/) {
    }
    storeinfos: Storeinfo[];
    ngOnInit(): void {
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
        // this.getlalong();
        }
    /*getlalong() {
        for (const store of this.storeinfos) {
            this.nativeGeocoder.forwardGeocode(store.address)
                .then((coordinates: NativeGeocoderForwardResult[]) => {
                    store.longtitude = Number(coordinates[0].longitude);
                    store.latitude = Number(coordinates[0].latitude);
                });
        }
    }*/
}
