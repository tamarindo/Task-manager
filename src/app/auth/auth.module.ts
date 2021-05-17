import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    RouterModule,
    AuthRoutingModule,
    CommonModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
  ],
  bootstrap:[]
})
export class AuthModule { }
