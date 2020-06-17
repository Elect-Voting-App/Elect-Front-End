import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordGenerator } from '../../../shared/password-generator';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  //Getting Form Controls for easy validation
  get firstname() {
    return this.registerAdmin.get('firstname');
  }

  get lastname() {
    return this.registerAdmin.get('lastname');
  }

  get email() {
    return this.registerAdmin.get('email');
  }

  get password() {
    return this.registerAdmin.get('password');
  }

  get role() {
    return this.registerAdmin.get('role');
  }

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log(this.generatedPassword);
  }

  //Declaring the generator
  generator = new PasswordGenerator();
  generatedPassword = this.generator.generate();



  //Creating the Form Model 
  registerAdmin = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [this.generatedPassword, [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]]
  });

  //Declaring Variables
  hasError= false;
  hasSuccess =false;
  hasErrorMessage: string;
  hasSuccessMessage: string;

  registerError() {
    return this.hasError;
  }
  registerSuccess() {
    return this.hasSuccess;
  }

  onSubmit() {
    this.adminService.register(this.registerAdmin.value)
      .subscribe(
        success => {
          if (success.status) {
            this.hasSuccess = true;
            this.hasSuccessMessage = success.message;
            this.registerAdmin.reset();
          } else {
            this.hasError = true;
            this.hasErrorMessage = success.message
          }
        },
        error => console.error('Error', error)
      );
  }
}
