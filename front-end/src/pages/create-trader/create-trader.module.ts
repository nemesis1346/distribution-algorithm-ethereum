import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTraderPage } from './create-trader';

@NgModule({
  declarations: [
    CreateTraderPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTraderPage),
  ],
})
export class CreateTraderPageModule {}
