import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AdMobFree } from '@ionic-native/admob-free';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProjectcreatePage } from '../pages/projectcreate/projectcreate';
import { ProjectlistPage } from '../pages/projectlist/projectlist';
import { ProjectopenPage } from '../pages/projectopen/projectopen';
import { ProjectcounterPage } from '../pages/projectcounter/projectcounter';
import { ProjecteditPage } from '../pages/projectedit/projectedit';

@NgModule({
  declarations: [
    MyApp,
    ProjectcreatePage,
    ProjectlistPage,
    ProjectopenPage,
    ProjecteditPage,
    ProjectcounterPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
    tabsPlacement: 'top',
    backButtonText: 'Tilbage'})
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjectcreatePage,
    ProjectlistPage,
    ProjectopenPage,
    ProjecteditPage,
    ProjectcounterPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Toast,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
