import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreementListPage } from './agreement-list';

@NgModule({
  declarations: [
    AgreementListPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementListPage),
  ],
})
export class AgreementListPageModule {}
