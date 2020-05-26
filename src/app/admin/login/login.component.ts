import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';

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

  constructor(private login: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
  }

  //Creating the Form Model
  loginForm = this.login.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
    .subscribe(
      response => console.log(response),
      error => console.error('Error', error)
    );
  }

}
