import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:3000/api/admin/login';
  constructor(private _http: HttpClient) { }
  
  //Http Post request to the server
  login(loginData) {
    return this._http.post<any>(this.url, loginData);
  }
}
