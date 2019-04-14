import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
<<<<<<< HEAD
import { NativeGeocoder,
    NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


=======
>>>>>>> parent of c000959... bug

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    constructor(private locationService: LocationService) {
    }
    storeinfos: Storeinfo[];
    ngOnInit(): void {
        const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 1
        };
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
<<<<<<< HEAD
        this.nativeGeocoder.forwardGeocode('Berlin', options)
            .then((coordinates: NativeGeocoderForwardResult[]) => {
                this.long = coordinates[0].longitude;
                this.lat = coordinates[0].latitude;
            })
            .catch((error: any) => console.log(error));
=======
>>>>>>> parent of c000959... bug
    }
}
