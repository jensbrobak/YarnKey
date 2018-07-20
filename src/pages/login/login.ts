import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ProjectlistPage } from '../projectlist/projectlist';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private navCtrl: NavController, private auth: AuthProvider) {
  }
  
  ionViewDidLoad() {
    if (this.auth.currentUser) {
      this.openProjectList();
    }
  }
  
  ionViewWillEnter() {
    if (this.auth.currentUser) {
      this.openProjectList();
    }
  }

  loginWithFacebook(): void {
this.auth.loginWithFacebook().subscribe((success) => {
this.openProjectList();
console.log(success);
}, err => {
console.log(err);
});
}

    logout(): void {
      this.auth.logout();
      
    }

    openProjectList() {
      this.navCtrl.push(ProjectlistPage);
    }
}
