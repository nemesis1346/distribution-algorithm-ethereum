import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrganizationAccountPage } from './create-organization-account';

@NgModule({
  declarations: [
    CreateOrganizationAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrganizationAccountPage),
  ],
})
export class CreateOrganizationAccountPageModule {}
