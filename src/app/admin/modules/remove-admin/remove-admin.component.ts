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
    this.allAdmins();
  }

  hasError: boolean;
  hasSuccess: boolean;
  Admins: any;
  hasErrorMessage: string;
  hasSuccessMessage: string;
  ID: number;

  deleteError() {
    return this.hasError;
  }

  deleteSuccess() {
    return this.hasSuccess;
  }

  //getting All Admins
  allAdmins() {
    this.adminService.getAll().subscribe(
      success => {
        if (success.status) {
          this.Admins = success.data;
        } else {
          this.hasError = true;
          this.hasErrorMessage = success.message
        }
      },
      error => console.error('Error', error)
    );
  }

  onDelete(id) {
    console.log(typeof(id));
    console.log(id);
    this.ID = parseInt(id);
    console.log(typeof(this.ID));
    this.adminService.deleteAdmin(id)
    .subscribe(
      success => {
        if (success.status) {
          this.hasSuccess = true;
          this.hasSuccessMessage = success.message;
          this.allAdmins();
        } else {
          this.hasError = true;
          this.hasErrorMessage = success.message
        }
      },
      error => console.error('Error', error)
    );
  }

}
