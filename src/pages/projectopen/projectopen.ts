import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectcounterPage } from '../projectcounter/projectcounter';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';
import { ProjectpictureuploadPage } from '../projectpictureupload/projectpictureupload';
import { ProjectsharePage } from '../projectshare/projectshare';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-projectopen',
  templateUrl: 'projectopen.html',
})
export class ProjectopenPage {

  public project: Project;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, public projectsService: ProjectsProvider, public auth: AuthProvider) {
      this.project = navParams.get("project");
  }

  ionViewDidLoad() {
    if(this.project.picture != "") {
    this.projectsService.projectPictureUrl = this.projectsService.getProjectPictureByRowId(this.project);
    }
  }
  
  ionViewWillEnter() {
    if(this.project.picture != "") {
    this.projectsService.projectPictureUrl = this.projectsService.getProjectPictureByRowId(this.project);
    }
  }

  uploadProjectPicture(project) {
    this.navCtrl.push(ProjectpictureuploadPage, {
      project:project
     });
  }

  shareProject(project) {
    this.navCtrl.push(ProjectsharePage, {
      project:project
     });
  }

  deleteConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Slet projekt?',
      message: 'Er du sikker på, at du vil slette dette projekt? - dette kan ikke gøres om!',
      buttons: [
        {
          text: 'Nej - bevar projektet',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja - slet!',
          handler: () => {
            this.deleteProject();
          console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  deleteProject() {
    this.projectsService.deleteProject(this.project);
    this.navCtrl.pop();
  }

  updateCounter(project) {
    this.navCtrl.push(ProjectcounterPage, {
     project:project
    });
  }
    editProject(project) {
      this.navCtrl.push(ProjecteditPage, {
        project:project
      });
    }

}
