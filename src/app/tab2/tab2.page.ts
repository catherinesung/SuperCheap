import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder, NativeGeocoderOptions,  NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    constructor(private locationService: LocationService, private nativeGeocoder: NativeGeocoder, private geolocation: Geolocation) {
    }
    storeinfos: Storeinfo[];
    gla: number;
    glong: number;
    myloca: string;
    ngOnInit(): void {
        this.locate();
        this.ard();
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
        }
    locate() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.gla = resp.coords.latitude;
            this.glong = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
    ard() {
        this.nativeGeocoder.reverseGeocode(this.gla, this.glong)
            .then( (result: NativeGeocoderResult[]) => {
                this.myloca = String(result[0]);
                console.log(this.myloca); }
            );
    }
    mark() {
        this.nativeGeocoder.forwardGeocode('Berlin', { useLocale: true, maxResults: 1 })
            .then((coordinates: NativeGeocoderResult[]) => {
                console.log(coordinates[0].latitude);
            });
    }
}
