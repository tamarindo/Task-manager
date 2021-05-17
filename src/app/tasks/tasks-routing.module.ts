import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelTasksComponent } from './pages/panel-tasks/panel-tasks.component'


const routes: Routes = [
  {
    path:'',
    children:[
      {path:'',component: PanelTasksComponent},
      {path:'**', redirectTo:'tasks'}
    ]
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
