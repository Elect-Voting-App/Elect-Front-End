import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { TimeOut } from 'src/app/shared/timeouts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voter-login',
  templateUrl: './voter-login.component.html',
  styleUrls: ['./voter-login.component.css']
})
export class VoterLoginComponent implements OnInit {

  //Getters for Form controls to allow easy validation
  get username() {
    return this.voterLoginForm.get('username');
  }

  get password() {
    return this.voterLoginForm.get('password');
  }

  constructor(private login: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  voterLoginForm = this.login.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  hasError = false;
  hasErrorMessage: string;

  timeOut = new TimeOut();

  //check for failed login
  loginError() {
    return this.hasError;
  }

  onSubmit() {
    console.log(this.voterLoginForm.value);
    this.authService.voterLogin(this.voterLoginForm.value)
    .subscribe(
      success => {
        console.log(success)
        if (success.status) {
          this.authService.doVoterLogin(success);
          this.voterLoginForm.reset();
          //Route Voter to voting screen
          this.router.navigate(['voting']);
          console.log('Successfull')
        } else {
          this.hasError = true;
          this.hasErrorMessage = success.message
          this.timeOut.displayErrorTimeout()
        }
      },
      error => console.error('Error', error)
    );
  }

}
