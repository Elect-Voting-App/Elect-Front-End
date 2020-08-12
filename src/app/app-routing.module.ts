import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { DefaultComponent } from './admin/layouts/default/default.component';
import { DashboardComponent } from './admin/modules/dashboard/dashboard.component';
import { AuthGuard } from './admin/shared/guards/auth.guard';
import { DashboardGuard } from './admin/shared/guards/dashboard.guard';
import { RegisterAdminComponent } from './admin/modules/register-admin/register-admin.component';
import { RemoveAdminComponent } from './admin/modules/remove-admin/remove-admin.component';
import { ResetAdminPasswordComponent } from './admin/modules/reset-admin-password/reset-admin-password.component';
import { RegisterVoterComponent } from './admin/modules/register-voter/register-voter.component';
import { RemoveVoterComponent } from './admin/modules/remove-voter/remove-voter.component';
import { ViewAllVotersComponent } from './admin/modules/view-all-voters/view-all-voters.component';
import { ResetVoterPasswordComponent } from './admin/modules/reset-voter-password/reset-voter-password.component';
import { ViewAllCandidatesComponent } from './admin/modules/view-all-candidates/view-all-candidates.component';
import { RegisterCandidateComponent } from './admin/modules/register-candidate/register-candidate.component';
import { RemoveCandidateComponent } from './admin/modules/remove-candidate/remove-candidate.component';
import { VoterLoginComponent } from './voter/voter-login/voter-login.component';
import { VotingComponent } from './voter/voting/voting.component';

//All Routes in the Application
const routes: Routes = [
  { path: 'admin/login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'admin', component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [DashboardGuard], canLoad: [DashboardGuard] },
      { path: 'register-admin', component: RegisterAdminComponent },
      { path: 'remove-admin', component: RemoveAdminComponent },
      { path: 'reset-admin-password', component: ResetAdminPasswordComponent },
      { path: 'register-voter', component: RegisterVoterComponent },
      { path: 'remove-voter', component: RemoveVoterComponent },
      { path: 'view-all-voters', component: ViewAllVotersComponent },
      { path: 'reset-voter-password', component: ResetVoterPasswordComponent },
      { path: 'view-all-candidates', component: ViewAllCandidatesComponent },
      { path: 'register-candidate', component: RegisterCandidateComponent },
      { path: 'remove-candidate', component: RemoveCandidateComponent }
    ]
  },
  { path: 'login', component: VoterLoginComponent },
  { path: 'voting', component: VotingComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, VoterLoginComponent]