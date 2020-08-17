import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-remove-candidate',
  templateUrl: './remove-candidate.component.html',
  styleUrls: ['./remove-candidate.component.css']
})
export class RemoveCandidateComponent implements OnInit {

  //Get Form controls for easy validation
  get firstname() {
    return this.deleteForm.get('firstname');
  }

  get lastname() {
    return this.deleteForm.get('lastname');
  }

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  deleteForm = this.formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]]
  });

  //Declaring Variables
  hasError = false;
  hasSuccess = false;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  Candidates: any;
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
    this.adminService.searchCandidate(this.deleteForm.value)
      .subscribe(
        success => {
          if (success.status) {
            this.isLoading = false;
            this.hasSuccess = true;
            this.hasSuccessMessage = 'Match Found';
            this.Candidates = success.data;
            this.deleteForm.reset();
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
  }

  onDelete(id) {
    this.isLoading = true;
    this.ID = parseInt(id);
    this.adminService.deleteCandidate(id)
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
  }

}
