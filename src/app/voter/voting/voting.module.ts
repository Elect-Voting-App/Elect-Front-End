import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingComponent } from './voting.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/admin/shared/guards/auth.guard';
import { AdminService } from 'src/app/admin/shared/services/admin.service';
import { AuthService } from 'src/app/admin/shared/services/auth.service';
import { VoterService } from '../shared/services/voter.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/token.interceptor';
import { VoteComponent } from '../modules/vote/vote.component';



@NgModule({
  declarations: [
    VotingComponent,
    VoteComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class VotingModule { }
