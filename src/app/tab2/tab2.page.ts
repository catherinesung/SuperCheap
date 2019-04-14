import {Component, OnInit} from '@angular/core';
import {LocationService} from '../location.service';
import {Storeinfo} from '../storeinfo';

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
        this.locationService.getlocation().subscribe(
            (res: Storeinfo[]) => {
                this.storeinfos = res;
            });
    }
}
