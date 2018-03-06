import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { ProjectlistPage } from '../pages/projectlist/projectlist';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ProjectlistPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private admobFree : AdMobFree) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.showAdmobBannerAds();
      
    });
  }

  showAdmobBannerAds(){
    const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-5529737002644560/4244109727', 
        isTesting: true,
        autoShow: true,

      };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
    .then(() => {

        this.admobFree.banner.show();
    })
    .catch(e => console.log(e));    
    }
    
}
