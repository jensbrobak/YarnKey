import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Log af?',
      message: 'Er du sikker på, at du vil logge af Garnnoter Pro?',
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

}
