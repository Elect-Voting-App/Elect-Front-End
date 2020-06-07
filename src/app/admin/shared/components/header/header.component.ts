import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //Toggling SideBar
  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  onSubmit() {
    this.authService.logout()
      .subscribe(
        success => {
          if (success) {
            this.router.navigate(['admin/login']);
          }
        },
        error => console.error('Error', error)
      );
    console.log('Logout Clicked');
  }

}
