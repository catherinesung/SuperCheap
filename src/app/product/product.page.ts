import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Item } from '../item';
import { ItemService } from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {PopoverComponent} from '../popover/popover.component';
import {PopoverController, ToastController} from '@ionic/angular';
import { Chart } from 'chart.js';
import {UserRecordService} from '../user-record.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  providers: [DatePipe]
})
export class ProductPage implements OnInit {
    items: Item[];
    display: Item;
    prodbarcode: string;
    prodinType: Item[];
    recommend: Item[];
    num: number[];
    chart: any;
    label: string[];
    data: number[];

    @ViewChild('pricetrend') canvas: ElementRef;
    public ctx: CanvasRenderingContext2D;

    constructor(private cartservice: CartService, private datePipe: DatePipe, private itemservice: ItemService,
                public popoverController: PopoverController, private route: ActivatedRoute,
                private router: Router, public toastController: ToastController,
                private userrecordservice: UserRecordService) {
        this.route.queryParams.subscribe(params => {
            this.prodbarcode = params['prodbarcode'];
        });
    }

    ngOnInit(): void {
        this.getItems();
    }

    async getItems() {
        this.prodinType = [];
        this.recommend = [];
        this.num = [0, 1, 2, 3, 4];
        this.items = await this.itemservice.getItemList();
        console.log(this.items);
        this.InitItems();
        this.getprodinType();
        for (let i = 0; i < 5; i++) {
            if (typeof this.recommend[i] !== 'undefined') {
                this.recommend[i]['sorted'] = this.sortPrice(this.recommend[i]);
            }
        }
        this.drawChart();
    }

    InitItems(): void {
        this.display = this.items.find(x => x.barcode === this.prodbarcode);
        if (typeof this.display !== 'undefined') {this.display['sorted'] = this.sortPrice(this.display);}
        console.log(this.display);
    }

    sortPrice(itemm: Item) {
        let supermarketarr = ['parknshop', 'wellcome', 'marketplace', 'aeon', 'dch', 'waston'];
        let pricearr = [itemm.price_parknshop, itemm.price_wellcome, itemm.price_marketplace, itemm.price_aeon, itemm.price_dch,
            itemm.price_waston];
        let remark = [itemm.remark_parknshop, itemm.remark_wellcome, itemm.remark_marketplace,
            itemm.remark_aeon, itemm.remark_dch, itemm.remark_waston];
        const currformat = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        let sorted = [];
        for (let i = 0; i < 6; i++) {
            let min = 9999;
            let num = -1;
            for (let j = 0; j < 6; j++) {
                if ((pricearr[j] !== 0) && (pricearr[j] < min)) {
                    min = pricearr[j];
                    num = j;
                }
            }
            if (num !== -1) {;
                if ((remark[num][0] !== -1) && (remark[num][1] !== -1)) {
                    if (remark[num][2] === 0) {
                        let text = currformat.format(remark[num][1]) + ' / ' + remark[num][0] + '件';
                    } else {let text = '買' + remark[num][3] + '送' + remark[num][4]; }
                } else {let text = ''; }
                sorted.push([supermarketarr[num], currformat.format(pricearr[num]), text]);
                pricearr[num] = 0;
            }
        }
        return sorted;
    }

    async popOver(itemm: Item) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            componentProps: {
                'fitem': itemm
            },
            backdropDismiss: false,
            animated: true,
            showBackdrop: true
        });

        await popover.present();
        const model = await popover.onDidDismiss();

        switch (model.role) {
            case 'confirm':
                this.cartservice.addProduct(itemm, Number(model.data[1]), model.data[0]);
                this.presentToast(model.data[1] + '件' + itemm.brand_tc + itemm.name_tc + '已加入購物車', 2000);
                console.log('confirm' + model.data[0] + model.data[1]);
                break;
            case 'fail':
                console.log('fail');
                break;
        }
    }

    drawChart(): void {
        const date = new Date();
        this.label = [];
        this.label[6] = this.datePipe.transform(date, 'MMM d');
        for (let i = 5; i >= 0; i--) {
            this.label[i] = this.datePipe.transform(date.setDate(date.getDate() - 1), 'MMM d');
        }
        this.data = [];
        if (typeof this.display !== 'undefined') {
            this.data.push(this.display.d6b_price);
            this.data.push(this.display.d5b_price);
            this.data.push(this.display.d4b_price);
            this.data.push(this.display.d3b_price);
            this.data.push(this.display.d2b_price);
            this.data.push(this.display.d1b_price);
            this.data.push(this.display.d0b_price);
        }
        this.ctx = (<HTMLCanvasElement> this.canvas.nativeElement).getContext('2d');
        if (this.ctx !== null) {
            this.chart = new Chart(this.ctx, {
                type: 'line',
                data: {
                    labels: this.label,
                    datasets: [{
                        data: this.data,
                        borderColor: '#ff9500',
                        fill: false
                    }]},
                options: {
                    elements: {line: {tension: 0}},
                    legend: {display: false},
                    scales: {
                        XAxes: [{display: true}],
                        YAxes: [{display: false}]
                    }
                }
            });
        }
    }

    getprodinType(): void {
        this.prodinType = this.items.filter(x => x.type_tc === this.display.type_tc);
        this.randomItems();
    }

    randomItems(): void {
        /*let arr = [];
        while (arr.length < 5) {
            let r = Math.floor(Math.random() * this.prodinType.length);
            if (arr.indexOf(r) === -1) {arr.push(r); }
        }*/
        for (let i = 0; i < 5; i++) {
            if (typeof this.prodinType[i] !== 'undefined') {
                this.recommend[i] = this.prodinType[i];
            }
        }
    }

    onSelect(item: Item) {
        this.router.navigate(['../product'], { queryParams:
                {prodbarcode: item.barcode}});
    }

    async presentToast(message: string, duration: number) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            color: 'secondary',
            position: 'top'
        });
        toast.present();
    }
}
