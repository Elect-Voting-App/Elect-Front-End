import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { PasswordGenerator } from 'src/app/shared/password-generator';
import { TimeOut } from 'src/app/shared/timeouts';

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
  Voters: any;
  ID: number;

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
    this.adminService.searchVoter(this.resetForm.value)
      .subscribe(
        success => {
          if (success.status) {
            this.hasSuccess = true;
            this.hasSuccessMessage = 'Match Found';
            this.isLoading = false;
            this.Voters = success.data;
            this.resetForm.reset();
            this.timeOut.displaySuccessTimeout
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

  onDelete(id) {
    this.isLoading = true;
    this.ID = parseInt(id);
    this.adminService.deleteVoter(this.ID)
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
            this.timeOut.displayErrorTimeout
          }
        },
        error => console.log('Error ', error)
      );
  }

}
