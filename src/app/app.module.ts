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
import { ProjectcounterPageModule } from '../pages/projectcounter/projectcounter.module';
import { ProjectcreatePageModule } from '../pages/projectcreate/projectcreate.module';
import { ProjecteditPageModule } from '../pages/projectedit/projectedit.module';
import { ProjectlistPageModule } from '../pages/projectlist/projectlist.module';
import { ProjectopenPageModule } from '../pages/projectopen/projectopen.module';
import { ProjectsProvider } from '../providers/projects/projects';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
 
export const firebaseConfig = {
  apiKey: "AIzaSyBWtexs_zbO5Zna-KXMNZVVTAeZ4J4gWwM",
  authDomain: "garnnoter.firebaseapp.com",
  databaseURL: "https://garnnoter.firebaseio.com",
  projectId: "garnnoter",
  storageBucket: "garnnoter.appspot.com",
  messagingSenderId: "445601800494"
};

@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    ProjectcounterPageModule,
    ProjectcreatePageModule,
    ProjecteditPageModule,
    ProjectlistPageModule,
    ProjectopenPageModule,
    IonicModule.forRoot(MyApp, {
    tabsPlacement: 'top',
    backButtonText: 'Tilbage'}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
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
    Toast,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectsProvider
  ]
})
export class AppModule {}
