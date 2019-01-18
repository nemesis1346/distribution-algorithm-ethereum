import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackListPage } from './track-list';

@NgModule({
  declarations: [
    TrackListPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackListPage),
  ],
})
export class TrackListPageModule {}
