import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder,  NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    constructor(private locationService: LocationService,
                private nativeGeocoder: NativeGeocoder,
                private geolocation: Geolocation,
                private selector: WheelSelector) {
    }
    storeinfos: Storeinfo[];
    fstoreinfos: Storeinfo[];
    gla: number;
    glong: number;
    // myloca: string;
    keywords = ' ';
    filterstr: string;
     storeselection = {
        store: [
            {description: 'PK'},
            {description: 'MP'},
            {description: 'WC'}
        ],
        fruits: [
            {description: 'Apple'},
            {description: 'Banana'},
            {description: 'Tangerine'}
        ]
    };
    ngOnInit(): void {
        this.locate();
        // this.ard();
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
                this.filter();
            });
        }
    selectStore() {
        this.selector.show({
            title: '請選擇商店',
            items: [ this.storeselection.store
            ],
            positiveButtonText: 'Ok',
            negativeButtonText: 'Cancel',
        }).then(
            result => {
                this.keywords = result[0];
                this.filter();
            },
            err => console.log('Error: ', err)
        );
    }
    locate() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.gla = resp.coords.latitude;
            this.glong = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
    /*ard() {
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
    }*/
    filter() {
        this.fstoreinfos = [];
        if (this.keywords !== ' ') {
            for (const store of this.storeinfos) {
                this.filterstr = store.type + store.name + store.address + store.region + store.district;
                console.log(this.keywords) ;
             if (this.filterstr.toString().toLowerCase().includes(this.keywords.toLowerCase())) {
                 this.fstoreinfos.push(store);
             }
            }
        } else { this.fstoreinfos = this.storeinfos; console.log(this.fstoreinfos); }
    }
    Search(value: string) {
       this.keywords = value;
       this.filter();
    }
}
