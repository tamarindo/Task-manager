import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/pages/tasks/tasks.component';
import { HistoryTasksComponent } from './tasks/pages/history-tasks/history-tasks.component';

const routes: Routes = [
  {
    path:'',
    component:TasksComponent
  },
  {
    path:'historical',
    component:HistoryTasksComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
