import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;

  constructor(private navCtrl: NavController, private fb: FormBuilder, private auth: AuthProvider) {
    this.loginForm = this.fb.group({  
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
 
    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  loginWithFacebook(): void {
this.auth.loginWithFacebook().subscribe((success) => {
console.log(success);
}, err => {
console.log(err);
});
}

    logout(): void {
      this.auth.logout();
    }
}
