import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';
import { PickerController } from '@ionic/angular';
import {CallNumber} from '@ionic-native/call-number/ngx';
import { LaunchNavigator} from '@ionic-native/launch-navigator/ngx';
import { LoadingController } from '@ionic/angular';
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
                private launchNavigator: LaunchNavigator,
                private pickerCtrl: PickerController,
                private callNumber: CallNumber,
                public loadingController: LoadingController) {
    }
    storeinfos: Storeinfo[];
    fstoreinfos: Storeinfo[];
    gla: number;
    glong: number;
    keywords = ' ';
    filterstr: string;
    previous;
    map: any;
    myLat: number;
    myLong: number;
    ngOnInit(): void {
        this.presentLoading().then(()=>{
                this.locationService.getlocation().subscribe(
                    (res: Storeinfo[]) => {
                        this.storeinfos = res;
                        this.location();
                    });
        });
    }
    async presentLoading() {
        const loading = await this.loadingController.create({
            message: '請稍候..正在下載地圖',
        });
        await loading.present();
    }

    callphone(store) {
        this.callNumber.callNumber(store.phone, true)
            .then(() => console.log('Dialer Launched!'))
            .catch(() => console.log('Error launching dialer'));
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
            this.myLat = resp.coords.latitude;
            this.myLong = resp.coords.longitude;
            this.filter();
            this.loadingController.dismiss();
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
      onSelect(store: any) {
          setTimeout(() => {
              this.gla = Number(store.latitude);
              this.glong = Number(store.longtitude);
              console.log(this.glong + this.gla);
          });
      }
      navigation(store: any) {
          const position = [this.myLat, this.myLong];
          console.log('yo');
          this.launchNavigator.navigate([store.latitude, store.longtitude], { start: position})
              .then(
              success => console.log('Launched navigator'),
              error => console.log('Error launching navigator', error)
          );
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
                            text: '請選擇商店 ',
                            value: ' '
                        },
                        {
                            text: '百佳',
                            value: 'parknshop'
                        },
                        {
                            text: 'Marketplace',
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
        });
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
                            text: '請選撰區域 ',
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
        });
        await picker.present();
    }
    async openPicker3() {
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
                            text: '中西區',
                            value: '中西區'
                        },
                        {
                            text: '灣仔',
                            value: '灣仔'
                        },
                        {
                            text: '東區',
                            value: '東區'
                        },
                        {
                            text: '南區',
                            value: '南區'
                        },
                        {
                            text: '油尖旺',
                            value: '油尖旺'
                        },
                        {
                            text: '深水埗',
                            value: '深水埗'
                        },
                        {
                            text: '九龍城',
                            value: '九龍城'
                        },
                        {
                            text: '黃大仙',
                            value: '黃大仙'
                        },
                        {
                            text: '觀塘',
                            value: '觀塘'
                        },
                        {
                            text: '葵青',
                            value: '葵青'
                        },
                        {
                            text: '屯門',
                            value: '屯門'
                        },
                        {
                            text: '元朗',
                            value: '元朗'
                        },
                        {
                            text: '北區',
                            value: '北區'
                        },
                        {
                            text: '大埔',
                            value: '大埔'
                        },
                        {
                            text: '沙田',
                            value: '沙田'
                        }
                    ]
                }
            ]
        });
        await picker.present();
    }
}
