import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-view-all-voters',
  templateUrl: './view-all-voters.component.html',
  styleUrls: ['./view-all-voters.component.css']
})
export class ViewAllVotersComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    //Start loading animation
    this.isLoading = true;
    this.getVoters();
  }

  //Variables
  hasError: boolean;
  hasSuccess: boolean;
  Voters: any;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  timeOut = new TimeOut();


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

  //Get All voters method
  getVoters() {
    this.adminService.getAllVoters().subscribe(
      success => {
        if (success.status) {
          this.isLoading = false;
          this.Voters = success.data;
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
