import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RegisterAdminComponent } from '../../modules/register-admin/register-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/token.interceptor';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthService } from '../../shared/services/auth.service';
import { DashboardGuard } from '../../shared/guards/dashboard.guard';
import { AdminService } from '../../shared/services/admin.service';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    RegisterAdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    DashboardGuard,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class DefaultModule { }
