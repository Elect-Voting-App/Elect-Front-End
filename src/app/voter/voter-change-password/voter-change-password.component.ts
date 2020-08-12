import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeOut } from 'src/app/shared/timeouts';
import { PasswordValidator } from '../shared/password.validator';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { VoterService } from '../shared/services/voter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voter-change-password',
  templateUrl: './voter-change-password.component.html',
  styleUrls: ['./voter-change-password.component.css']
})
export class VoterChangePasswordComponent implements OnInit {

  get oldPassword() {
    return this.changePassForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  constructor(private changePass: FormBuilder, private authService: AuthService, private voterService: VoterService, private router: Router) { }

  ngOnInit(): void {
  }

  voter = this.authService.getUserInfo();



  changePassForm = this.changePass.group({
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { validator: PasswordValidator });


  hasError = false;
  hasErrorMessage: string;

  timeOut = new TimeOut();

  //check for change password error
  changePassError() {
    return this.hasError;
  }

  onSubmit() {
    let requestValues = {
      studentID: this.voter.studentID,
      oldPassword: this.changePassForm.value.oldPassword,
      newPassword: this.changePassForm.value.newPassword,
      confirmPassword: this.changePassForm.value.confirmPassword
    }
    console.log(requestValues);
    this.voterService.changePassword(requestValues)
    .subscribe(
      success => {
        console.log(success)
        if (success.status) {
          this.authService.voterLogout()
          .subscribe(
            success => {
              if (success) {
                this.router.navigate(['login']);
              }
            },
            error => console.error('Error', error)
          );
        } else {
          this.hasError = true;
          this.hasErrorMessage = success.message
          this.timeOut.displayErrorTimeout()
          this.changePassForm.reset();
        }
      },
      error => console.error('Error', error)
    );

  }

}
