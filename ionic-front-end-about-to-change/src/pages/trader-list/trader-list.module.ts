import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TraderListPage } from './trader-list';

@NgModule({
  declarations: [
    TraderListPage,
  ],
  imports: [
    IonicPageModule.forChild(TraderListPage),
  ],
})
export class TraderListPageModule {}
