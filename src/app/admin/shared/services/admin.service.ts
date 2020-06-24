import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //Registering Admin
  register(adminData) {
    return this.http.post<any>(`${config.adminApiUrl}/register`, adminData);
  }

  //Getting All Admins
  getAll() {
    return this.http.get<any>(`${config.adminApiUrl}/all-admins`);
  }

  //Deleting Admin
  deleteAdmin(id) {
    return this.http.delete<any>(`${config.adminApiUrl}/remove/${id}`);
  }

  //Sending Admin Email
  sendEmail(adminData) {
    return this.http.post<any>(`${config.adminMailerUrl}/admin`, adminData);
  }

  //Searching for admin Email
  searchEmail(adminEmail) {
    return this.http.post<any>(`${config.adminApiUrl}/search`, adminEmail);
  }

  //Update password
  resetPassword(adminData) {
    return this.http.put<any>(`${config.adminApiUrl}/update-pass`,adminData);
  }

}
