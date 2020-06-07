import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordGenerator } from '../../../shared/password-generator';

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

  constructor(private formBuilder: FormBuilder) { }

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

  onSubmit() {
    console.log(this.registerAdmin.value)
  }
}
