import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TraderDetailPage } from './trader-detail';

@NgModule({
  declarations: [
    TraderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TraderDetailPage),
  ],
})
export class TraderDetailPageModule {}
