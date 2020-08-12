import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Getting voter Info
  voter = this.authService.getUserInfo();

  canActivate() {
    if (this.voter.initialLogin) {
      this.router.navigate(['voter-change-pass']);
    }
    return !this.voter.initialLogin;
  }

}
