import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectedit',
  templateUrl: 'projectedit.html',
})
export class ProjecteditPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: Toast,
    public projectsService: ProjectsProvider) {
      this.projectsService.getCurrentProject(navParams.get("rowid"));
  }

  updateProject() {
    this.projectsService.updateProject(); 
    this.navCtrl.pop();
    this.toast.show('Projekt opdateret', 'short', 'center').subscribe(
          toast => {}
        );
  }
}
