import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectedit',
  templateUrl: 'projectedit.html',
})
export class ProjecteditPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public projectsService: ProjectsProvider) {
      this.projectsService.getCurrentProject(navParams.get("rowid"));
  }
}
