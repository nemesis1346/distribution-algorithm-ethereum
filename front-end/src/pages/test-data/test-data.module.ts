import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestDataPage } from './test-data';

@NgModule({
  declarations: [
    TestDataPage,
  ],
  imports: [
    IonicPageModule.forChild(TestDataPage),
  ],
})
export class TestDataPageModule {}
