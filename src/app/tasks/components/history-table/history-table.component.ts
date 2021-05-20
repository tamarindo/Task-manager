import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {Task} from '../../models/task'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})

export class HistoryTableComponent implements OnInit   {
  displayedColumns: string[] =  ['descripcion', 'durationS', 'timeS','dateComplete'];
  TableHistoryTasks: any;
  @Input('data') CompleteTasks:any;
   
  constructor(private _servicio: TasksService) {
   }
   @ViewChild(MatPaginator, {static:true}) paginator2: any;
   updateHistoryTable(CompleteTasks:Task[]){
    this.TableHistoryTasks =  new MatTableDataSource<Task>(
      CompleteTasks
      );
    this.TableHistoryTasks.paginator = this.paginator2;
  }
  ngOnInit(): void {
    this.updateHistoryTable(this.CompleteTasks); 
  }
}
