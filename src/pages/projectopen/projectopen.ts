import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ProjecteditPage } from '../projectedit/projectedit';
import { ProjectcounterPage } from '../projectcounter/projectcounter';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectopen',
  templateUrl: 'projectopen.html',
})
export class ProjectopenPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, public projectsService: ProjectsProvider) {
      this.getCurrentProject(navParams.get("rowid"));
  }

IonViewDidLoad() {
  this.getCurrentProject(this.projectsService.project.rowid);
}

ionViewWillEnter() {
 this.getCurrentProject(this.projectsService.project.rowid); 
}

getCurrentProject(rowid) {
  this.projectsService.getCurrentProject(rowid);
}

  deleteConfirm(rowid) {
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
            this.deleteProject(rowid);
          console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  deleteProject(rowid) {
    this.projectsService.deleteProject(rowid);
    this.navCtrl.popToRoot();
  }

  updateCounter(rowid, counter) {
    this.navCtrl.push(ProjectcounterPage, {
      rowid:rowid,
      counter:counter
    });
  }
    editProject(rowid) {
      this.navCtrl.push(ProjecteditPage, {
        rowid:rowid
      });
    }

}
