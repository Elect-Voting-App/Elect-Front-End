import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { PasswordGenerator } from 'src/app/shared/password-generator';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-reset-admin-password',
  templateUrl: './reset-admin-password.component.html',
  styleUrls: ['./reset-admin-password.component.css']
})
export class ResetAdminPasswordComponent implements OnInit {

  //Get From controls for easy validation
  get email() {
    return this.resetForm.get('email');
  }

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  //Creating the Form Model
  resetForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  });

  //Declaring Variables
  hasError = false;
  hasSuccess = false;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  Admins: any;

  searchError() {
    return this.hasError;
  }
  searchSuccess() {
    return this.hasSuccess;
  }

  loadingRequest() {
    return this.isLoading;
  }

  matchFound() {
    return this.hasSuccess;
  }

  timeOut = new TimeOut();

  //On Search 
  onSearch() {
    this.isLoading = true;
    this.adminService.searchEmail(this.resetForm.value)
      .subscribe(
        success => {
          if (success.status) {
            this.hasSuccess = true;
            this.hasSuccessMessage = 'Match Found';
            this.isLoading = false;
            this.Admins = success.data;
            this.resetForm.reset();
            this.timeOut.displaySuccessTimeout()
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message;
            this.timeOut.displayErrorTimeout()
          }
        },
        error => console.error('Error', error)
      );
  }

  onReset(email) {
    this.isLoading = true;
    //Declaring the generator
    let generator = new PasswordGenerator();
    let generatedPassword = generator.generate();
    let requestValues = { email: email, password: generatedPassword }
    console.log(requestValues);
    this.adminService.resetPassword(requestValues)
      .subscribe(
        success => {
          if (success.status) {
            //Send email to the user with the generated password
            this.adminService.sendResetEmail(requestValues)
              .subscribe(
                success => {
                  if (success.status) {
                    this.isLoading = false;
                    this.hasSuccess = true;
                    this.hasSuccessMessage = success.message;
                    this.timeOut.displaySuccessTimeout()
                  } else {
                    this.isLoading = false;
                    this.hasError = true;
                    this.hasErrorMessage = success.message;
                    this.timeOut.displayErrorTimeout()
                  }
                },
                error => console.log('Error', error)
              );
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message;
            this.timeOut.displayErrorTimeout()
          }
        },
        error => console.log('Error ', error)
      );
  }

}
