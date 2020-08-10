import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Getters for Form controls to allow easy validation
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private login: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //Creating the Form Model
  loginForm = this.login.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  hasError = false
  hasErrorMessage: string;

  timeOut = new TimeOut();
  
  //checking for Failed Login
  loginError() {
    return this.hasError;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .subscribe(
        success => {
          if (success.status) {
            this.authService.doLoginUser(success);
            this.loginForm.reset();
            this.router.navigate(['admin']);
          } else {
            this.hasError = true;
            this.hasErrorMessage = success.message
            this.timeOut.displayErrorTimeout();
          }
        },
        error => console.error('Error', error)
      );
  }

}
