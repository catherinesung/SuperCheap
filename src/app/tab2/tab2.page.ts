import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
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
    ngOnInit(): void {
        this.locate();
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
            this.nativeGeocoder.forwardGeocode('Berlin', { useLocale: true, maxResults: 1 })
                .then((coordinates: NativeGeocoderResult[]) => {
                    console.log(coordinates[0].latitude);
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
}
