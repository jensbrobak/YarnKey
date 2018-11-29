import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';

@IonicPage()
@Component({
  selector: 'page-projectedit',
  templateUrl: 'projectedit.html',
})
export class ProjecteditPage {

  public project : Project;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: Toast,
    public projectsService: ProjectsProvider) {
      this.project = navParams.get("project");
  }

  updateProject() {
    this.projectsService.updateProject(this.project); 
    this.navCtrl.pop();
    this.toast.show('Projekt opdateret', 'short', 'center').subscribe(
          toast => {}
        ).unsubscribe();
  }
}
