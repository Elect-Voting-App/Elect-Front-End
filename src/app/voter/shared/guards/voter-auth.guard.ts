import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VoterAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['voting']);
    }
    return !this.authService.isLoggedIn();
  }

}
