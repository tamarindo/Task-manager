import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardlogin } from "./shared/guard/auth.guardLogin";
import { AuthGuardlogout } from "./shared/guard/auth.guardLogout";

const routes: Routes = [
  {
    path:'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(m=> m.TasksModule) , canActivate: [AuthGuardlogin]
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule),canActivate: [AuthGuardlogout]
  },
  {path:'**', redirectTo:'tasks'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
