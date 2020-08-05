import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { PasswordGenerator } from 'src/app/shared/password-generator';

@Component({
  selector: 'app-reset-voter-password',
  templateUrl: './reset-voter-password.component.html',
  styleUrls: ['./reset-voter-password.component.css']
})
export class ResetVoterPasswordComponent implements OnInit {

  //Get Form controls for easy validation
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
  Voters: any;

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

  //On Search
  onSearch() {
    this.isLoading = true;
    this.adminService.searchVoter(this.resetForm.value)
      .subscribe(
        success => {
          if (success.status) {
            this.hasSuccess = true;
            this.hasSuccessMessage = 'Match Found';
            this.isLoading = false;
            this.Voters = success.data;
            this.resetForm.reset();
          } else {
            this.isLoading = false;
            this.hasError = false;
            this.hasErrorMessage = success.message;
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
    this.adminService.resetVoterPassword(requestValues)
      .subscribe(
        success => {
          if (success.status) {
            //Send email to the voter with the generated password
            this.adminService.sendVoterResetEmail(requestValues)
              .subscribe(
                success => {
                  if (success.status) {
                    this.isLoading = false;
                    this.hasSuccess = true;
                    this.hasSuccessMessage = success.message;
                  } else {
                    this.isLoading = false;
                    this.hasError = true;
                    this.hasErrorMessage = success.message;
                  }
                },
                error => console.log('Error', error)
              );
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message;
          }
        },
        error => console.log('Error', error)
      );
  }

}
