import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadTrackPage } from './upload-track';

@NgModule({
  declarations: [
    UploadTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadTrackPage),
  ],
})
export class UploadTrackPageModule {}
