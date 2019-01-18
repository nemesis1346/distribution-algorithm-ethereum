import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAgreementPage } from './create-agreement';

@NgModule({
  declarations: [
    CreateAgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAgreementPage),
  ],
})
export class CreateAgreementPageModule {}
