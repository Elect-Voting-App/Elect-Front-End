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

  register(adminData) {
    return this.http.post<any>(`${config.adminApiUrl}/register`, adminData);
  }


}
