import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder,  NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';
import { PickerController } from '@ionic/angular';
@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
    constructor(private locationService: LocationService,
                private nativeGeocoder: NativeGeocoder,
                private geolocation: Geolocation,
                private selector: WheelSelector,
                private pickerCtrl: PickerController) {
    }
    storeinfos: Storeinfo[];
    fstoreinfos: Storeinfo[];
    gla: number;
    glong: number;
    keywords = ' ';
    filterstr: string;
    previous;
    ngOnInit(): void {
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
                this.location();
            });
    }
    markerclick(infowindow) {
        if (this.previous) {
            this.previous.close();
        }
        this.previous = infowindow;
    }
    location() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.gla = resp.coords.latitude;
            this.glong = resp.coords.longitude;
            this.filter();
        });
    }
    filter() {
            this.fstoreinfos = [];
        for (const store of this.storeinfos) {
            if (store.latitude !== 0) {
                store.distance =  Math.PI * 2 * Math.asin( Math.pow( Math.sin( (this.gla - store.latitude) / 2), 2)
                    + Math.cos(store.latitude) * Math.cos( this.gla) *
                    Math.pow( Math.sin((store.longtitude - this.glong) / 2), 2));
            } else {store.distance = 2000000; }
        }
            if (this.keywords !== ' ') {
                for (const store of this.storeinfos) {
                    this.filterstr = store.type + store.name + store.address + store.region + store.district;
                    if (this.filterstr.toString().toLowerCase().includes(this.keywords.toLowerCase())) {
                        this.fstoreinfos.push(store);
                    }
                }
            } else {
                for (const store of this.storeinfos) {
                    this.fstoreinfos.push(store);
                }
            }
            this.fstoreinfos.sort(function(obj1, obj2) {
                // Ascending: first age less than the previous
                return  obj1.distance - obj2.distance; });
        }
    Search(value: string) {
       this.keywords = value;
       this.filter();
    }
    findOnMap(latitude: number, longtitude: number) {
        this.gla = latitude;
        this.glong = longtitude;
    }
    async openPicker2() {
        const picker = await this.pickerCtrl.create({
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                        console.log(data.list.value);
                    }
                },
                {
                    text: '確定',
                    role: 'done',
                    handler: data => {
                        console.log(data.list.value);
                        this.keywords = data.list.value;
                        this.filter();
                    }
                }
            ],
            columns: [
                {
                    name: 'list',
                    options: [
                        {
                            text: '請選撰商店 ',
                            value: ' '
                        },
                        {
                            text: '百佳',
                            value: 'parknshop'
                        },
                        {
                            text: 'Markerplace',
                            value: 'marketplace'
                        },
                        {
                            text: '惠康',
                            value: 'Wellcome'
                        },
                        {
                            text: '屈臣氏',
                            value: 'watson'
                        },
                        {
                            text: '大昌',
                            value: 'dch'
                        },
                        {
                            text: 'Aeon',
                            value: 'aeon'
                        },
                    ]
                }
            ]
        })
        await picker.present();
    }
    async openPicker() {
        const picker = await this.pickerCtrl.create({
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: data => {
                        console.log(data.list.value);
                    }
                },
                {
                    text: '確定',
                    role: 'done',
                    handler: data => {
                        console.log(data.list.value);
                        this.keywords = data.list.value;
                        this.filter();
                    }
                }
            ],
            columns: [
                {
                    name: 'list',
                    options: [
                        {
                            text: '請選撰地區 ',
                            value: ' '
                        },
                        {
                            text: '新界 ',
                            value: 'NT'
                        },
                        {
                            text: '九龍',
                            value: 'KL'
                        },
                        {
                            text: '香港島',
                            value: 'HK'
                        }
                    ]
                }
            ]
        })
        await picker.present();
    }
}
