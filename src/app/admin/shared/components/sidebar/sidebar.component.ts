import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  admin = this.authService.getUserInfo();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  checkAdminStatus() {
    if (this.admin.role === 'admin') {
      return true;
    }
    return false;
  }

  name = this.admin.name;
  email = this.admin.email;

}
