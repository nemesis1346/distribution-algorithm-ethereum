import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreementDetailPage } from './agreement-detail';

@NgModule({
  declarations: [
    AgreementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementDetailPage),
  ],
})
export class AgreementDetailPageModule {}
