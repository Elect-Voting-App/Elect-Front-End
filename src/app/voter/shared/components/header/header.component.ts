import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'voting-header',
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
    this.authService.voterLogout()
    .subscribe(
      success => {
        if (success) {
          this.router.navigate(['login']);
        }
      },
      error => console.error('Error', error)
    );
  }

}
