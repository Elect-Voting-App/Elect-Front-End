import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { PasswordGenerator } from 'src/app/shared/password-generator';

@Component({
  selector: 'app-remove-voter',
  templateUrl: './remove-voter.component.html',
  styleUrls: ['./remove-voter.component.css']
})
export class RemoveVoterComponent implements OnInit {

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
          } else {
            this.isLoading = false;
            this.hasError = true;
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
        error => console.log('Error ', error)
      );
  }

}
