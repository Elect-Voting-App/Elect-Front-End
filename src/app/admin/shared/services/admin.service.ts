import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { config } from 'src/app/shared/config';
import { tap, mapTo, catchError } from 'rxjs/operators';

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

  deleteAdmin(id) {
    return this.http.delete<any>(`${config.adminApiUrl}/remove/${id}`);
  }

}
