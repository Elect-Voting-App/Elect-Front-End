import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
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
  login(loginData) {
    return this._http.post<any>(`${config.adminApiUrl}/login`, loginData);
  }

  //Login http post request to the server for voter
  voterLogin(loginData) {
    return this._http.post<any>(`${config.voterApiUrl}/login`, loginData);
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

  //Logout http post request to the server for voter
  voterLogout() {
    return this._http.post<any>(`${config.voterApiUrl}/logout`, {
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

  getInitialLogin() {
    let initial = JSON.parse(localStorage.getItem("USER"));
    return this._http.post<any>(`${config.adminApiUrl}/initial`,{email: initial.email});
  }
  
  getVoterInitialLogin() {
    let initial = JSON.parse(localStorage.getItem("USER"));
    return this._http.post<any>(`${config.voterApiUrl}/initial`,{studentID: initial.studentID});
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  //method for getting user information
  getUserInfo() {
    let user = JSON.parse(localStorage.getItem("USER"));
    return user;
  }

  refreshToken() {
    return this._http.post<any>(`${config.adminApiUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  //Method to take tokens and do login
  doLoginUser(tokens: Tokens) {
    this.storeTokens(tokens);
    this.storeUserInfo(tokens);
  }

  doVoterLogin(tokens: Tokens) {
    this.storeTokens(tokens);
    this.storeVoterInfo(tokens);
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

  private storeVoterInfo(tokens: Tokens) {
    let voter = {
      name: tokens.name,
      studentID: tokens.studentID,
      hall: tokens.hall
    }
    localStorage.setItem(this.USER, JSON.stringify(voter));
  }

  //Getting refresh token
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  //store JWT Token
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  //Removing tokens from localstorage
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER);
  }
}
