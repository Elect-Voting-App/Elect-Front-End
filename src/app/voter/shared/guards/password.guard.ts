import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  // Getting voter Info
  voter = this.authService.getUserInfo();

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'])
    } else if (this.voter.initialLogin) {
      this.router.navigate(['voter-change-password']);
    }
    return this.authService.isLoggedIn()
  }


}
