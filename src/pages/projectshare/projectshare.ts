import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Project } from '../../models/project.interface';
import { ProjectsProvider } from '../../providers/projects/projects';
import { UsersProvider } from '../../providers/users/users';
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

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams, 
    public projectsService: ProjectsProvider, 
    public usersService: UsersProvider,
    public auth: AuthProvider, 
    public toast: Toast,
    public alertCtrl: AlertController) {

    this.project = navParams.get("project");
  }

  updateShare(project) {

        if(project.share == project.owner) {

          this.toast.show('Du kan ikke dele projektet med dig selv!', 'short', 'center').subscribe(
            toast => {}
            ); 

          } else {

          }

          this.usersService.userCheck(project.share);

        if(this.usersService.userExists) {

        project.shareStatus = true; 
        this.projectsService.updateShare(project);
        this.navCtrl.pop();
        this.toast.show('Projekt delt med bruger '+ project.share +' ', 'short', 'center').subscribe(
          toast => {}
          );

        } else {
        
          this.toast.show('Bruger '+ project.share +' eksistere ikke! ', 'short', 'center').subscribe(
            toast => {}
            );
        }

  }

  removeShare(project) {
    let confirm = this.alertCtrl.create({
      title: 'Stop projektdelingen?',
      message: 'Er du sikker på, at du vil stoppe projektdelingen med '+ project.share +'?',
      buttons: [
        {
          text: 'Nej - bevar projektdeling',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja - stop projektdeling!',
          handler: () => {
            project.share = null;
            project.shareStatus = false;
            this.projectsService.updateShare(project);
            this.navCtrl.pop();
            this.toast.show('Projektdeling stoppet!', 'short', 'center').subscribe(
              toast => {}
              );
          console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
}

}
