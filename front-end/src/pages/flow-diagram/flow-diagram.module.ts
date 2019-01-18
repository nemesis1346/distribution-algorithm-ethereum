import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlowDiagramPage } from './flow-diagram';

@NgModule({
  declarations: [
    FlowDiagramPage,
  ],
  imports: [
    IonicPageModule.forChild(FlowDiagramPage),
  ],
})
export class FlowDiagramPageModule {}
