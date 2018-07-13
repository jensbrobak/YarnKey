import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectpictureuploadPage } from './projectpictureupload';

@NgModule({
  declarations: [
    ProjectpictureuploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectpictureuploadPage),
  ],

  exports: [
    ProjectpictureuploadPage,
  ]
})
export class ProjectpictureuploadPageModule {}
