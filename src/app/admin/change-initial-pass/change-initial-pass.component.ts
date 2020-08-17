import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/voter/shared/password.validator';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-change-initial-pass',
  templateUrl: './change-initial-pass.component.html',
  styleUrls: ['./change-initial-pass.component.css']
})
export class ChangeInitialPassComponent implements OnInit {

  get oldPassword() {
    return this.changePassForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePassForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePassForm.get('confirmPassword');
  }

  constructor(private changePass: FormBuilder, private authService: AuthService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  admin = this.authService.getUserInfo();



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
      email: this.admin.email,
      oldPassword: this.changePassForm.value.oldPassword,
      newPassword: this.changePassForm.value.newPassword,
      confirmPassword: this.changePassForm.value.confirmPassword
    }
    console.log(requestValues);
    this.adminService.changePassword(requestValues)
    .subscribe(
      success => {
        console.log(success)
        if (success.status) {
          this.authService.logout()
          .subscribe(
            success => {
              if (success) {
                this.router.navigate(['admin/login']);
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
