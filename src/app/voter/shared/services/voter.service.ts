import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient) { }

  changePassword(voterData) {
    console.log('Got Here')
    return this.http.post<any>(`${config.voterApiUrl}/password-change`, voterData);
  }  

  getCategories() {
    return this.http.post<any>(`${config.voterApiUrl}/categories`,null);
  }

  getPositions() {
    return this.http.post<any>(`${config.voterApiUrl}/positions`,null);
  }

  getCandidates() {
    return this.http.post<any>(`${config.voterApiUrl}/candidates`, null);
  }

  submitVotes(votes) {
    return this.http.post<any>(`${config.voterApiUrl}/vote`, {data: votes});
  }

  getResults() {
    return this.http.post<any>(`${config.voterApiUrl}/results`,null)
  }
}
