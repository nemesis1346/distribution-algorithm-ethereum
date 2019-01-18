import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManualPaymentPage } from './manual-payment';

@NgModule({
  declarations: [
    ManualPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(ManualPaymentPage),
  ],
})
export class ManualPaymentPageModule {}
