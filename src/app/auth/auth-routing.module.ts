import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'login',component: LoginComponent},
      {path:'**', redirectTo:'login'}
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]

})
export class AuthRoutingModule { }
