import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { TimeOut } from 'src/app/shared/timeouts';

@Component({
  selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.css']
})
export class RemoveAdminComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    //Start loading animation
    this.isLoading = true;
    this.allAdmins();
  }

  hasError: boolean;
  hasSuccess: boolean;
  Admins: any;
  isLoading = false;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  ID: number;

  deleteError() {
    return this.hasError;
  }

  deleteSuccess() {
    return this.hasSuccess;
  }

  loadingRequest() {
    return this.isLoading;
  }

  timeOut = new TimeOut();

  //getting All Admins
  allAdmins() {
    this.adminService.getAllAdmins().subscribe(
      success => {
        if (success.status) {
          this.isLoading = false;
          this.Admins = success.data;
          this.timeOut.displaySuccessTimeout()
        } else {
          this.isLoading = false;
          this.hasError = true;
          this.hasErrorMessage = success.message
          this.timeOut.displayErrorTimeout()
        }
      },
      error => console.error('Error', error)
    );
  }

  onDelete(id) {
    this.isLoading = true;
    this.ID = parseInt(id);
    this.adminService.deleteAdmin(id)
      .subscribe(
        success => {
          if (success.status) {
            this.isLoading = false;
            this.hasSuccess = true;
            this.hasSuccessMessage = success.message;
            this.timeOut.displaySuccessTimeout()
            this.allAdmins();
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message
            this.timeOut.displayErrorTimeout()
          }
        },
        error => console.error('Error', error)
      );
  }

}
