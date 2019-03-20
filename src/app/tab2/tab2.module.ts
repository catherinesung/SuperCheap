import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6dyxa7LcY0jokheX7GJa2Ifwd20ncJ1A'
    })
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {
  lat: number = 24.1504536;
  lng: number = 120.68325279999999;
  zoomValue: number = 15;
}
