import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Project } from '../../models/project.interface';
import { ProjectsProvider } from '../../providers/projects/projects';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProjectsharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectshare',
  templateUrl: 'projectshare.html',
})
export class ProjectsharePage {

  public project : Project;

  constructor(public navCtrl: NavController, public navParams: NavParams, public projectsService: ProjectsProvider, public auth: AuthProvider, public toast: Toast) {
    this.project = navParams.get("project");
  }

  updateShare(project) {
      this.auth.userCheck(project.share).subscribe((success) => {
        this.project = project;
        this.projectsService.updateShare(project);
        this.navCtrl.pop();
        this.toast.show('Projekt delt med bruger '+ project.share +' ', 'short', 'center').subscribe(
          toast => {}
          );
        console.log(success);
        }, err => {
          this.toast.show('Bruger '+ project.share +' eksistere ikke! ', 'short', 'center').subscribe(
            toast => {}
            );
        console.log(err);
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsharePage');
  }

}
