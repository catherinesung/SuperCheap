import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {
    title: string = 'My first AGM project';
    lat: number = 51.678418;
    lng: number = 7.809007;

    ngOnInit(): void {
    }
}
