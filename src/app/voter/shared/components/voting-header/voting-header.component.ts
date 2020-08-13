import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting-header',
  templateUrl: './voting-header.component.html',
  styleUrls: ['./voting-header.component.css']
})
export class VotingHeaderComponent implements OnInit {

@Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

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
