import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user.interface';
import { map } from 'rxjs/operators';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  db : string;

  user : User; 
  
  userExists: boolean;

  constructor(private afStore: AngularFirestore) {

    this.db = 'users';

  }

  collectUserInfo(uid, emailAddress) {

    // this.userCheck(emailAddress);

    if(this.userCheck(emailAddress).email != null) {
  
    this.afStore.collection(this.db).doc(uid).set({
  
      uid: uid,
      email: emailAddress,
  
  });
    }
  }

userCheck(emailAddress): User {

  this.afStore.collection(this.db, (ref) => ref.where('email', '==', emailAddress)).snapshotChanges().pipe(
    map(
        changes => { 
          
          return changes.map(a => {
            
            if(a.payload.doc.exists) {

            return this.user = a.payload.doc.data() as User;

            } else {

            return this.user = null;

            }

      });
      }
    )).subscribe();

    return this.user;
  
}

deleteUser(uid) {

  this.afStore.collection(this.db).doc(uid).delete().then(function(success) {

    console.log('success on deleting '+ uid +' user account',success);

  }).catch(function(error) {

    console.log('error on deleting '+ uid +' user account',error);

  });

}

}
