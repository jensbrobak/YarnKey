import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

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
      this.showAdmobInterstitialAds();
      
    });
  }

  showAdmobBannerAds(){
    const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-5529737002644560/4244109727', 
        isTesting: false,
        autoShow: true,

      };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
    .then(() => {

        this.admobFree.banner.show();
    })
    .catch(e => console.log(e));    
    }
    

    showAdmobInterstitialAds(){
      const interstitialConfig: AdMobFreeInterstitialConfig = {
          id: 'ca-app-pub-5529737002644560/9555898735', 
          isTesting: false,
          autoShow: true,
  
        };
        this.admobFree.interstitial.config(interstitialConfig);
  
        this.admobFree.interstitial.prepare()
        .then(() => {
            this.admobFree.interstitial.show();
        })
        .catch(e => console.log(e));    
      } 
}
