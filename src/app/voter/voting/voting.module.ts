import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/admin/shared/guards/auth.guard';
import { AdminService } from 'src/app/admin/shared/services/admin.service';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { VoterService } from '../shared/services/voter.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/token.interceptor';
import { VoteComponent } from '../modules/vote/vote.component';
import { ViewResultsComponent } from '../modules/view-results/view-results.component';
import { ChangeVoterOwnPasswordComponent } from '../modules/change-voter-own-password/change-voter-own-password.component';
import { VotingPasswordGuard } from '../shared/guards/voting-password.guard';
import { VoterAuthGuard } from '../shared/guards/voter-auth.guard';



@NgModule({
  declarations: [
    VotingComponent,
    VoteComponent,
    ViewResultsComponent,
    ChangeVoterOwnPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  providers: [
    AuthGuard,
    AdminService,
    AuthService,
    VoterService,
    VotingPasswordGuard,
    VoterAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class VotingModule { }
