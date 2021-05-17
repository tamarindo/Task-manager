import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelTasksComponent } from './pages/panel-tasks/panel-tasks.component'
import { HistoryTableComponent } from './components/history-table/history-table.component'
import { MainControlsComponent } from './components/main-controls/main-controls.component'
import { MainTableComponent } from './components/main-table/main-table.component'
import { ModalTaskComponent } from './components/modal-task/modal-task.component'

import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule } from '@angular/material/form-field';
import { TasksRoutingModule } from './tasks-routing.module'
import { MinuteSecondsPipe } from './pipes/minutes-seconds.pipe';
import { ModalTaskDeleteComponent } from './components/modal-delete-task/modal-delete-task.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    HistoryTableComponent,
    MainControlsComponent,
    MainTableComponent,
    PanelTasksComponent,
    ModalTaskComponent,
    MinuteSecondsPipe,
    ModalTaskDeleteComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[
    ModalTaskDeleteComponent
  ],
  bootstrap:[PanelTasksComponent]
})
export class TasksModule { }
