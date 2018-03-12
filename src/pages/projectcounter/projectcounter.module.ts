import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectcounterPage } from './projectcounter';

@NgModule({
  declarations: [
    ProjectcounterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectcounterPage),
  ],
  exports: [
    ProjectcounterPage,
  ]
})
export class ProjectcounterPageModule {}
