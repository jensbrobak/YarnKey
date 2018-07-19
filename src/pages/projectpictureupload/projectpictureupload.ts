import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { ProjectsProvider } from '../../providers/projects/projects';
import { AuthProvider } from '../../providers/auth/auth';
import { Project } from '../../models/project.interface';

/**
 * Generated class for the ProjectpictureuploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectpictureupload',
  templateUrl: 'projectpictureupload.html',
})
export class ProjectpictureuploadPage {

  public project : Project;
  public projectPictureUrl : string;

  task: AngularFireUploadTask;

  progress: any;  // Observable 0 to 100

  constructor(public navCtrl: NavController, public navParams: NavParams, public projectsService: ProjectsProvider, public auth: AuthProvider, public camera: Camera, public storage: AngularFireStorage) {
    this.project = navParams.get("project");
  }

async takeProjectPicture() {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  }
  return await this.camera.getPicture(options)
  }

  createUploadTask(file: string): void {
    if(this.project.picture != "") {
    this.projectsService.deleteProjectPictureByRowId(this.project);
    }
    const filePath = `${this.auth.currentUser}/${this.project.rowid}/projectPicture_${ new Date().getTime() }.jpg`;
    this.project.picture = filePath;
    this.projectsService.updateProjectPicture(this.project);
    this.projectPictureUrl = 'data:image/jpg;base64,' + file;
    
    this.task = this.projectsService.uploadProjectPicture(filePath, this.projectPictureUrl);

    this.progress = this.task.percentageChanges();
}

async uploadHandler() {
   const base64 = await this.takeProjectPicture();
   this.createUploadTask(base64);
}

}
