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

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  //Declaring Variables
  hasError = false;
  hasSuccess = false;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;

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
    lastname: ['', [Validators.required, Validators.nullValidator]]
  });

}
