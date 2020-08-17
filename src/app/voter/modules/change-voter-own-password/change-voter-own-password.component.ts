import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { VoterService } from '../../shared/services/voter.service';
import { PasswordValidator } from '../../shared/password.validator';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-change-voter-own-password',
  templateUrl: './change-voter-own-password.component.html',
  styleUrls: ['./change-voter-own-password.component.css']
})
export class ChangeVoterOwnPasswordComponent implements OnInit {

  get oldPassword() {
    return this.changePassForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  constructor(private changePass: FormBuilder, private authService: AuthService, private voterService: VoterService) { }

  ngOnInit(): void {
  }

  voter = this.authService.getUserInfo();



  changePassForm = this.changePass.group({
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { validator: PasswordValidator });


  hasError = false;
  hasSuccess = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;


  timeOut = new TimeOut();

  //check for change password error
  changePassError() {
    return this.hasError;
  }

  changePassSuccess() {
    return this.hasSuccess;
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
            this.hasSuccess = true
            this.hasErrorMessage = success.message
            this.timeOut.displaySuccessTimeout()
            this.changePassForm.reset();
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
