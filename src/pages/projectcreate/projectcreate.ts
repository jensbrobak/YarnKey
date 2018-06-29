import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ProjectsProvider } from '../../providers/projects/projects';

@IonicPage()
@Component({
  selector: 'page-projectcreate',
  templateUrl: 'projectcreate.html',
})
export class ProjectcreatePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: Toast,
    public projectsService: ProjectsProvider) {}

saveProject() {
    this.projectsService.saveProject();
    this.navCtrl.popToRoot();
    this.toast.show('Projekt oprettet', 'short', 'center').subscribe(
      toast => {}
    );
}


}
