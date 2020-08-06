import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.css']
})
export class RegisterCandidateComponent implements OnInit {

  //Getting Form Controls for easy validation
  get firstname() {
    return this.registerCandidate.get('firstname');
  }

  get lastname() {
    return this.registerCandidate.get('lastname');
  }

  get category() {
    return this.registerCandidate.get('category');
  }

  get position() {
    return this.registerCandidate.get('position');
  }

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getPositions();
    this.getCategories();
  }

  //Declaring Variables
  hasError = false;
  hasSuccess = false;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  Positions: any;
  Category: any;

  registerError() {
    return this.hasError;
  }

  registerSuccess() {
    return this.hasSuccess;
  }

  loadingRequest() {
    return this.isLoading;
  }

  registerCandidate = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.nullValidator]],
    lastname: ['', [Validators.required, Validators.nullValidator]],
    category: ['', [Validators.required]],
    position: ['', [Validators.required]]
  });

  getPositions() {
    this.adminService.getPositions()
      .subscribe(
        success => {
          if (success.status) {
            this.isLoading = false;
            this.Positions = success.data;
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message;
          }
        },
        error => console.log('Error', error)
      );
  }

  getCategories() {
    this.adminService.getCategories()
      .subscribe(
        success => {
          if (success.status) {
            this.isLoading = false;
            this.Category = success.data;
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message;
          }
        },
        error => console.log('Error', error)
      );
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.registerCandidate.value);
    this.adminService.registerCandidate(this.registerCandidate.value)
      .subscribe(
        success => {
          if (success.status) {
            this.isLoading = false;
            this.hasSuccess = true;
            this.hasSuccessMessage = success.message;
            this.registerCandidate.reset();
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
