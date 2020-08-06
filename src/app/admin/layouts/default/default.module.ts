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
import { RemoveAdminComponent } from '../../modules/remove-admin/remove-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResetAdminPasswordComponent } from '../../modules/reset-admin-password/reset-admin-password.component';
import { RegisterVoterComponent } from '../../modules/register-voter/register-voter.component';
import { RemoveVoterComponent } from '../../modules/remove-voter/remove-voter.component';
import { ViewAllVotersComponent } from '../../modules/view-all-voters/view-all-voters.component';
import { ResetVoterPasswordComponent } from '../../modules/reset-voter-password/reset-voter-password.component';
import { ViewAllCandidatesComponent } from '../../modules/view-all-candidates/view-all-candidates.component';
import { RemoveCandidateComponent } from '../../modules/remove-candidate/remove-candidate.component';
import { RegisterCandidateComponent } from '../../modules/register-candidate/register-candidate.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    RegisterAdminComponent,
    RemoveAdminComponent,
    ResetAdminPasswordComponent,
    RegisterVoterComponent,
    RemoveVoterComponent,
    ViewAllVotersComponent,
    ResetVoterPasswordComponent,
    ViewAllCandidatesComponent,
    RegisterCandidateComponent,
    RemoveCandidateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatProgressBarModule
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
