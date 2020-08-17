import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPasswordGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  // Getting voter Info
  admin = this.authService.getUserInfo();

  canActivate() {
    return this.canLoad();
  }
  
  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['admin/login'])
    } else if (this.admin.initialLogin)  {
      this.router.navigate(['change-initial-password']);
    }
    return this.authService.isLoggedIn()
  }
  
}
