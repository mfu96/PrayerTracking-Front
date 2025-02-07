import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UserOptions } from 'src/app/interfaces/user-options';
import { UserData } from 'src/app/providers/user-data';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage implements OnInit {

  loginForm: FormGroup | undefined;
  currentCustomerEmail: string = "";



  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private authService: AuthService,
    private storage :Storage
  ) { }


  ngOnInit(): void {
   // this.ceratedLoginForm();
    
  }




  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
