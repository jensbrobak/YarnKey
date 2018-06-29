import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectcreate',
  templateUrl: 'projectcreate.html',
})
export class ProjectcreatePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public projectsService: ProjectsProvider) {}

}
