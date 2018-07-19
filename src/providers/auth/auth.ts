import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'; //Added Facebook
import * as firebase from 'firebase/app'; //Changed firebase/app

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

constructor(private af: AngularFireAuth, private fb: Facebook, private platform: Platform) {
  }
  
loginWithFacebook() {
return Observable.create(observer => {
if (this.platform.is('cordova')) {
return this.fb.login(['email', 'public_profile']).then(res => {
const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
this.af.auth.signInWithCredential(facebookCredential).then(()=> {
observer.next();
}).catch(error => {
//console.log(error);
observer.error(error);
});
});
} else {
return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
observer.next();
}).catch(error => {
//console.log(error);
observer.error(error);
});
}
});
}

  logout() {
    this.af.auth.signOut();
  }

  get currentUser():string{
    return this.af.auth.currentUser?this.af.auth.currentUser.email:null;
  } 

}
