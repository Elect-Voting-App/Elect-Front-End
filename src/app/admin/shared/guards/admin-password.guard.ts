import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPasswordGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // Getting voter Info
  admin = this.authService.getUserInfo();

  canActivate() {
    if (this.admin.initialLogin == 1) {
      this.router.navigate(['change-initial-password']);
    }
    return !this.admin.initialLogin;
  }
  
}
