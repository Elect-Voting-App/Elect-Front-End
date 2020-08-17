import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-view-all-candidates',
  templateUrl: './view-all-candidates.component.html',
  styleUrls: ['./view-all-candidates.component.css']
})
export class ViewAllCandidatesComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCandidates();
  }

  //Variables
  hasError: boolean;
  hasSuccess: boolean;
  Candidates: any;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;

  //Load success
  loadingSuccess() {
    return this.hasSuccess;
  }

  //Load Error
  loadingError() {
    return this.hasError;
  }

  //Loading animation
  loadingRequest() {
    return this.isLoading;
  }

  timeOut = new TimeOut();

  //Get All candidates method
  getCandidates() {
    this.adminService.getAllCandidates().subscribe(
      success => {
        if (success.status) {
          this.isLoading = false;
          this.Candidates = success.data;
          this.timeOut.displaySuccessTimeout()
        } else {
          this.isLoading = false;
          this.hasError = true;
          this.hasErrorMessage = success.message
          this.timeOut.displayErrorTimeout()
        }
      },
      error => console.log('Error ', error)
    );
  }

}
