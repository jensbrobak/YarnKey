import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjecteditPage } from './projectedit';

@NgModule({
  declarations: [
    ProjecteditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjecteditPage),
  ],
  
  exports: [
    ProjecteditPage,
  ]
})
export class ProjecteditPageModule {}
