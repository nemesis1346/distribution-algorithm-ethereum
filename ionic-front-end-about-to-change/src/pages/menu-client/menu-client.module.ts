import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuClientPage } from './menu-client';

@NgModule({
  declarations: [
    MenuClientPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuClientPage),
  ],
})
export class MenuClientPageModule {}
