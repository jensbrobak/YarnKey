import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectopenPage } from './projectopen';

@NgModule({
  declarations: [
    ProjectopenPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectopenPage),
  ],
  
  exports: [
    ProjectopenPage,
  ]

})
export class ProjectopenPageModule {}
