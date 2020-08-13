import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VotingSidebarComponent } from './components/voting-sidebar/voting-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VotingHeaderComponent } from './components/voting-header/voting-header.component';



@NgModule({
  declarations: [
    VotingHeaderComponent,
    VotingSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  exports: [
    VotingHeaderComponent,
    VotingSidebarComponent
  ]
})
export class SharedModule { }
