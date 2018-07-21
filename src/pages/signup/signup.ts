import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ProjectlistPage } from '../projectlist/projectlist';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private auth: AuthProvider)
  {
    this.signupForm = this.fb.group({  
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
 
    this.email = this.signupForm.controls['email'];     
    this.password = this.signupForm.controls['password'];    
  }

  submit(): void { 
    if(this.signupForm.valid) {
        var credentials = ({email: this.email.value, password: this.password.value});
        this.auth.registerUser(credentials).subscribe(registerData => {
            console.log(registerData);
            alert('Bruger er blevet oprettet og logget ind.');
            this.navCtrl.setRoot(ProjectlistPage);
        }, registerError => {
          console.log(registerError);
          if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
          {
            alert(registerError.message);
          }
          this.error = registerError;
        });
    }
  } 
}
