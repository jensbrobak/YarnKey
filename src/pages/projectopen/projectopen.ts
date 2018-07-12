import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectcounterPage } from '../projectcounter/projectcounter';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';

@IonicPage()
@Component({
  selector: 'page-projectopen',
  templateUrl: 'projectopen.html',
})
export class ProjectopenPage {

  public project: Project;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, public projectsService: ProjectsProvider) {
      this.project = navParams.get("project");
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
    this.navCtrl.popToRoot();
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
