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
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup'; 
import { ResetPasswordPage } from '../pages/reset-password/reset-password'; 
import { ProjectpictureuploadPage } from '../pages/projectpictureupload/projectpictureupload';
import { ProjectcounterPageModule } from '../pages/projectcounter/projectcounter.module';
import { ProjectcreatePageModule } from '../pages/projectcreate/projectcreate.module';
import { ProjecteditPageModule } from '../pages/projectedit/projectedit.module';
import { ProjectlistPageModule } from '../pages/projectlist/projectlist.module';
import { ProjectopenPageModule } from '../pages/projectopen/projectopen.module';
import { ProjectpictureuploadPageModule } from '../pages/projectpictureupload/projectpictureupload.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module'; 
import { ResetPasswordPageModule } from '../pages/reset-password/reset-password.module'; 
import { ProjectsProvider } from '../providers/projects/projects';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook'; 

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
    ProjectpictureuploadPageModule,
    LoginPageModule,
    SignupPageModule,
    ResetPasswordPageModule,
    IonicModule.forRoot(MyApp, {
    tabsPlacement: 'top',
    backButtonText: 'Tilbage'}),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,            
    AngularFireAuthModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjectcreatePage,
    ProjectlistPage,
    ProjectopenPage,
    ProjecteditPage,
    ProjectcounterPage,
    LoginPage,
    ProjectpictureuploadPage,
    SignupPage,
    ResetPasswordPage 

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    AdMobFree,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectsProvider,
    AuthProvider,
    Facebook
  ]
})
export class AppModule {}
