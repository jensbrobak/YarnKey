import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ProjectlistPage } from '../pages/projectlist/projectlist';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private af: AngularFireAuth) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.af.authState.subscribe(user => {

      if (user) {
        this.rootPage = ProjectlistPage;
      } else {
        this.rootPage = LoginPage;

      }
    },
    () => {
      this.rootPage = LoginPage;
    }
  );
  }

  }
