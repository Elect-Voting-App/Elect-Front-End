import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

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

  //Get All voters method
  getVoters() {
    this.adminService.getAllVoters().subscribe(
      success => {
        if (success.status) {
          this.isLoading = false;
          this.Voters = success.data;
        } else {
          this.isLoading = false;
          this.hasError = true;
          this.hasErrorMessage = success.message
        }
      },
      error => console.log('Error ', error)
    );
  }

}
