import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectcreatePage } from './projectcreate';

@NgModule({
  declarations: [
    ProjectcreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectcreatePage),
  ],
  
  exports: [
    ProjectcreatePage,
  ]
})
export class ProjectcreatePageModule {}
