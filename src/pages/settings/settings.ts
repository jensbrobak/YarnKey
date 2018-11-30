import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { UsersProvider } from '../../providers/users/users';
import { ProjectsProvider } from '../../providers/projects/projects';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth: AuthProvider, 
    public usersService: UsersProvider,
    public projectsService: ProjectsProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Log af?',
      message: 'Er du sikker på, at du vil logge bruger '+ this.auth.currentUser +' af Garnnoter Pro?',
      buttons: [
        {
          text: 'Nej',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja - log mig af!',
          handler: () => {
            this.auth.logout();
            this.navCtrl.setRoot(LoginPage);
          console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  deleteUser() {
    let confirm = this.alertCtrl.create({
      title: 'Log af?',
      message: 'Er du sikker på, at du vil slette din brugerkonto '+ this.auth.currentUser +'? - dette kan ikke gøres om!',
      buttons: [
        {
          text: 'Nej - bevar min konto',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja - slet min bruger!',
          handler: () => {

            // this.auth.loginWithFacebook().subscribe((success) => {
            //   this.openProjectList();
            //   console.log(success);
            //   }, err => {
            //   console.log(err);
            //   }).unsubscribe();

            // Sletter alle brugerens projekter
            this.projectsService.deleteAllProjectsFromUser().subscribe((success) => {
              console.log(success);
            }, err => {
              console.log(err);
            }).unsubscribe();

            // Sletter bruger konto
            this.usersService.deleteUser(this.auth.connection.auth.currentUser.uid);

            // Sletter auth konto
            this.auth.deleteUserFromAuth();

            // Returnere til root page
            this.navCtrl.setRoot(LoginPage);

          console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
