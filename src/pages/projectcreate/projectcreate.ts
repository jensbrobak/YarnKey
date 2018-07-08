import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ProjectsProvider } from '../../providers/projects/projects';
import { Project } from '../../models/project.interface';

@IonicPage()
@Component({
  selector: 'page-projectcreate',
  templateUrl: 'projectcreate.html',
})
export class ProjectcreatePage {

  public project : Project;

  constructor(public navCtrl: NavController,
    public toast: Toast,
    public projectsService: ProjectsProvider) {
    //this.projectsService.clearProjectFields();
    this.project = { rowid:"", name:"", description:"", status:"Igangværende",  yarnProductName:"",  yarnColorCode:"", yarnColor:"",  yarnLength:"",  needleSize:"",  batchNr:"", notes:"", counter:0, recipe:"" } as Project;
    }

saveProject() {
    this.projectsService.saveProject(this.project);
    this.navCtrl.popToRoot();
    this.toast.show('Projekt oprettet', 'short', 'center').subscribe(
      toast => {}
    );
}


}
