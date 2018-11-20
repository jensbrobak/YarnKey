import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { ProjectlistPage } from '../projectlist/projectlist';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;
  signupPage = SignupPage; 
  resetPasswordPage = ResetPasswordPage;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public auth: AuthProvider) {
    this.loginForm = this.fb.group({  
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
 
    this.email = this.loginForm.controls['email'];     
    this.password = this.loginForm.controls['password'];
  }

  ionViewCanEnter() {
    this.loginCheck();
  }

  ionViewWillEnter() {
    this.loginCheck();
  }

  ionViewDidEnter() {
    this.loginCheck();
  }

  loginWithFacebook(): void {
this.auth.loginWithFacebook().subscribe((success) => {
this.openProjectList();
console.log(success);
}, err => {
console.log(err);
});
}

login(): void { 
  if(this.loginForm.valid) {
    var credentials = ({email: this.email.value, password: this.password.value});
    this.auth.loginWithEmail(credentials).subscribe(data => {
      this.openProjectList();
      console.log(data);
    }, error=>{
      console.log(error);
      if (error.code == 'auth/user-not-found')
      {
        alert('Bruger findes ikke!');
      }
    });
  }
}

openProjectList() {
  this.navCtrl.setRoot(ProjectlistPage);
}

loginCheck() {
  if (this.auth.currentUser) {
    this.openProjectList();
  }
}

}
