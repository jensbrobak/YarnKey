import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  db : string;
  
  userExists: boolean;

  constructor(private afStore: AngularFirestore) {

    this.db = 'users';

  }

  collectUserInfo(uid, emailAddress) {

    this.userCheck(emailAddress);

    if(!this.userExists) {
  
    this.afStore.collection(this.db).doc(uid).set({
  
      uid: uid,
      email: emailAddress,
  
  });
    }
  }

userCheck(emailAddress) {

  this.afStore.collection(this.db, (ref) => ref.where('email', '==', emailAddress).limit(1)).valueChanges().subscribe(users => { 
    
    if(users.length == 1) {

      this.userExists = true;
      console.log(users.length, this.userExists ,'Email match found for user');
  } else {

      this.userExists = false;
      console.log(users.length, this.userExists, 'Email match NOT found');
  
  }})};

}
