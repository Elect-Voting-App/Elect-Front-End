import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of,Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../../../shared/config';
import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Declarations
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly USER = 'USER';

  constructor(private _http: HttpClient) { }
  
  //Login http post request to the server
  login(loginData): Observable<boolean> {
    return this._http.post<any>(`${config.adminApiUrl}/login`, loginData)
    .pipe(
      tap(tokens => this.doLoginUser(tokens),),
      mapTo(true),
      catchError(error => {
        alert(error.error);
          return of(false);
      }));
  }

  //Logout http post request to the server
  logout() {
    return this._http.post<any>(`${config.adminApiUrl}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  //Private method for getting user information
  getUserInfo() {
    let user = JSON.parse(localStorage.getItem("USER"));
    return user;
  }


  //Private Method to take tokens and do login
  private doLoginUser(tokens: Tokens) {
    this.storeTokens(tokens);
    this.storeUserInfo(tokens);
  }

  //Private Method to logout 
  private doLogoutUser() {
    this.removeTokens();
  }

  //Private Method to store tokens in Local storage
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  //Private method to store user information in Local storage
  private storeUserInfo(tokens: Tokens) {
    let user = {
      name: tokens.name,
      email: tokens.email,
      role: tokens.role
    }
    localStorage.setItem(this.USER, JSON.stringify(user));
  }

  //Getting refresh token
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  //Removing tokens from localstorage
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER);
  }
}
