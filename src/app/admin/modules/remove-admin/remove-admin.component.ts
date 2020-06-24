import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';

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

  //getting All Admins
  allAdmins() {
    this.adminService.getAll().subscribe(
      success => {
        if (success.status) {
          this.isLoading = false;
          this.Admins = success.data;
        } else {
          this.isLoading = false;
          this.hasError = true;
          this.hasErrorMessage = success.message
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
            this.allAdmins();
          } else {
            this.isLoading = false;
            this.hasError = true;
            this.hasErrorMessage = success.message
          }
        },
        error => console.error('Error', error)
      );
  }

}
