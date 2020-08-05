import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //Register Admin
  register(adminData) {
    return this.http.post<any>(`${config.adminApiUrl}/register`, adminData);
  }

  //Get All Admins
  getAllAdmins() {
    return this.http.get<any>(`${config.adminApiUrl}/all-admins`);
  }

  //Deleting Admin
  deleteAdmin(id) {
    return this.http.delete<any>(`${config.adminApiUrl}/remove/${id}`);
  }

  //Send Admin Email
  sendEmail(adminData) {
    return this.http.post<any>(`${config.adminMailerUrl}/admin`, adminData);
  }

  //Search for admin Email
  searchEmail(adminEmail) {
    return this.http.post<any>(`${config.adminApiUrl}/search`, adminEmail);
  }

  //Update password
  resetPassword(adminData) {
    return this.http.put<any>(`${config.adminApiUrl}/update-pass`,adminData);
  }

  //Send Reset Email
  sendResetEmail(adminData) {
    return this.http.post<any>(`${config.adminMailerUrl}/update-pass`,adminData);
  }

  //Send Generated CSV blob 
  uploadBlob(formData) {
    return this.http.post<any>(`${config.adminApiUrl}/register-voter`,formData);
  }

  //Get all Voters
  getAllVoters() {
    return this.http.get<any>(`${config.adminApiUrl}/all-voters`);
  }

}
