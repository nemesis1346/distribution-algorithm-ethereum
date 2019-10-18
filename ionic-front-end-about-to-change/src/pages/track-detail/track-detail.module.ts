import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackDetailPage } from './track-detail';

@NgModule({
  declarations: [
    TrackDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackDetailPage),
  ],
})
export class TrackDetailPageModule {}
