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

  /*==== VOTERS ====*/
  //Send Generated CSV blob 
  registerVoter(voterData) {
    return this.http.post<any>(`${config.adminApiUrl}/register-voter`,voterData);
  }

  //Send Voter Email
  sendVoterEmail(voterData) {
    return this.http.post<any>(`${config.adminMailerUrl}/voter`,voterData);
  }

  //Get all Voters
  getAllVoters() {
    return this.http.get<any>(`${config.adminApiUrl}/all-voters`);
  }

  //Search voter
  searchVoter(voterEmail) {
    return this.http.post<any>(`${config.adminApiUrl}/search-voter`, voterEmail);
  }

  //Reset Voter Password
  resetVoterPassword(voterData) {
    return this.http.put<any>(`${config.adminApiUrl}/update-voter-pass`, voterData);
  }

  sendVoterResetEmail(voterData) {
    return this.http.post<any>(`${config.adminMailerUrl}/update-pass`, voterData);
  }

  //Delete Voter
  deleteVoter(id) {
    return this.http.delete<any>(`${config.adminApiUrl}/remove-voter/${id}`);
  }

  /*==== CANDIDATES ====*/
  getAllCandidates() {
    return this.http.get<any>(`${config.adminApiUrl}/all-candidates`);
  }

  //Search Candidate
  searchCandidate(candidateData) {
    return this.http.post<any>(`${config.adminApiUrl}/search-candidate`, candidateData);
  }

  //Delete Candidate
  deleteCandidate(id) {
    return this.http.delete<any>(`${config.adminApiUrl}/remove-candidate/${id}`);
  }

  //Get Positions
  getPositions() {
    return this.http.get<any>(`${config.adminApiUrl}/positions`);
  }

  //Get Categories
  getCategories() {
    return this.http.get<any>(`${config.adminApiUrl}/categories`);
  }

  //Register Candidate
  registerCandidate(candidateData) {
    return this.http.post<any>(`${config.adminApiUrl}/register-candidate`, candidateData);
  }

}
