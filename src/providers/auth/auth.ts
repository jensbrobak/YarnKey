import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from "rxjs/Observable";
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'; 
import * as firebase from 'firebase/app'; 
import { refCount } from 'rxjs/operators';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: boolean;
  users: Observable<any[]>;

constructor(private af: AngularFireAuth, private fb: Facebook, private afStore: AngularFirestore, private platform: Platform) {
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password
      ).then((authData) => {
        console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
  
loginWithFacebook() {
return Observable.create(observer => {
if (this.platform.is('cordova')) {
return this.fb.login(['email', 'public_profile']).then(res => {
const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
this.af.auth.signInAndRetrieveDataWithCredential(facebookCredential).then(()=> {
observer.next();
this.collectUserMail(this.af.auth.currentUser.email);
}).catch(error => {
console.log(error);
observer.error(error);
});
});
} else {
return this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
observer.next();
this.collectUserMail(this.af.auth.currentUser.email);
}).catch(error => {
console.log(error);
observer.error(error);
});
}
});
}

registerUser(credentials: any) {
  return Observable.create(observer => {
    this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
      observer.next(authData);
      this.collectUserMail(credentials.email);
    }).catch(error => {
      console.log(error);
      observer.error(error);
    });
  });
}

resetPassword(emailAddress:string){
  return Observable.create(observer => {
    this.af.auth.sendPasswordResetEmail(emailAddress).then(function(success) {
        console.log('email sent', success);
        observer.next(success);
      }, function(error) {
        console.log('error sending email',error);
        observer.error(error);
      });
   });
}

collectUserMail(emailAddress) {

  if(this.afStore.collection('users', ref => ref.where('email', '==', emailAddress))) {

  const uid = this.af.auth.currentUser.uid

  this.afStore.collection('users').doc(uid).set({

    uid: this.af.auth.currentUser.uid,
    email: emailAddress,

});
  }
}

  get currentUser():string{
    return this.af.auth.currentUser?this.af.auth.currentUser.email:null;
  } 

//   userExists(emailAddress) {
//     var query = this.afStore.collection('users', ref => ref.where('email', '==', emailAddress));
//       query.ref.get().then(function(doc) {
//         if (!doc.empty) {
//           return true;

//   }
//   return false;
// }

// userExists(emailAddress) {
//   var exists = false;
//   var query = this.afStore.collection('users', ref => ref.where('email', '==', emailAddress));
// query.ref.get().then(function(doc) {
//   if (!doc.empty) {
//       exists = true;
//   } else {
//       return false;
//   }
// }).catch(function(error) {
//   console.log("Error getting document:", error);
// });

//   }

// this.afs.collection('users', (ref) => ref.where('email', '==', email).limit(1)).get().subscribe(users => { if(users.size >= 0) ...do smthg })

userCheck(emailAddress) {
//   this.afStore.collection('users'), ref => ref.where('email', '==', emailAddress)
  
//   .limit(1).get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//       if(doc.data) {
        
//         this.user = true;
//       }
//         this.user = false;
//         // doc.data() is never undefined for query doc snapshots

//         console.log(doc.id, " => ", doc.data());
//     });
// });

// this.afStore.collection('users'), ref => ref.where('email', '==', emailAddress).ref.get().then((documentSnapshot) => {
//   if(documentSnapshot.exists)
//   {
//     this.user = true;
//   }
//    this.user = false;
//   console.log(documentSnapshot.exists);
// });

this.users = this.afStore.collection('users', ref => ref.where('email', '==', emailAddress)).valueChanges();

if(this.users.subscribe(ref => ref.length >= 0)) {
  return true;
}
 return false;
  // query.snapshotChanges().forEach(doc => {
  //   if (doc.entries) {
  //     this.user = true;
  //   }
  //   this.user = false;
  
  // })

}


  logout() {
    this.af.auth.signOut();
  }

}
