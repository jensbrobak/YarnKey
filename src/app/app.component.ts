import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ProjectlistPage } from '../pages/projectlist/projectlist';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private auth: AuthProvider) 
    {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // auto-login - tjekker hvorvidt en session eksistere
    this.auth.connection.authState.subscribe(user => {

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
