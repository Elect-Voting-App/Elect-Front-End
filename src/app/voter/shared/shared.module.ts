import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VotingComponent } from '../voting/voting.component';
import { AuthGuard } from 'src/app/admin/shared/guards/auth.guard';
import { AdminService } from 'src/app/admin/shared/services/admin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VotingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AdminService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
