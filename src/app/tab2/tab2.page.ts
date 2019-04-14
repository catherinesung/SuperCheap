import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder,  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    lat: string;
    long: string;
    constructor(private locationService: LocationService, private nativeGeocoder: NativeGeocoder) {
    }
    storeinfos: Storeinfo[];
    ngOnInit(): void {
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
        this.nativeGeocoder.forwardGeocode('Berlin')
            .then((coordinates: NativeGeocoderForwardResult[]) => {
                this.long = coordinates[0].longitude;
                this.lat = coordinates[0].latitude;
            })
            .catch((error: any) => console.log(error));
    }
}
