import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private login: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  //Creating the Form Model
  loginForm = this.login.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    this.authService.login(this.loginForm.value)
    .subscribe(
      success => {
        if (success) {
          this.router.navigate(['admin']);
        }
      },
      error => console.error('Error', error)
    );
  }

}
