import { Component, AfterViewInit ,ViewChild, Input,Output, EventEmitter, OnInit} from '@angular/core';

import {Task} from '../../models/task'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalTaskComponent} from '../modal-task/modal-task.component'
import { ModalTaskDeleteComponent } from '../modal-delete-task/modal-delete-task.component';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit  {
  displayedColumns: string[] =  ['descripcion', 'durationS','Controles', 'timeS','opciones'];
  TablePendingTasks: any = null;
  StatusPlay:boolean = false;
  timer:number = 0;
  idFristE:any;
  @Input('data') PendingTasks:any;
  @Input('idFristElement') idFristElement:string="";
  
  @Output() deleteTaskEvent = new EventEmitter<Task>();
  @Output() completeTaskEvent = new EventEmitter<Task>();
  @Output() saveTaskEvent = new EventEmitter<Task>();
  @Output() updateTimeEvent = new EventEmitter<Task>();
  @Output() editTaskfroModal = new EventEmitter<Task>();
  

  constructor(
    public dialog: MatDialog) { 
  }


  @ViewChild(MatPaginator) paginator: any;


  ngOnInit() {
    //this.updateTable(this.PendingTasks);
    if(localStorage.getItem('timer') != null){
      let task:any = JSON.parse(localStorage.getItem('pengindTask')|| '');
      let timer:any = JSON.parse(localStorage.getItem('timer')|| '')
      task.timeS = timer.timer;
      setTimeout(()=>{
      this.editTask(task); },500);   
      localStorage.removeItem('pengindTask');
      localStorage.removeItem('timer');  
    };
 
  }

  
  updateTable(PendingTasks:Task[]){
    this.TablePendingTasks =  new MatTableDataSource<Task>(
      PendingTasks
      );
      this.idFristE = PendingTasks[0].id;
    this.TablePendingTasks.paginator = this.paginator;
  }
  
  playTimer(task:any){ 
    if(this.StatusPlay == false){
      this.updateTimer(task.timeS)
      this.StatusPlay= true;

      var id  = setInterval(()=>{
        if(this.timer < 1){
          this.StatusPlay= false; 
          task.completed = true;
          task.timeS = 0;
          const f:Date = new Date();
          task.dateComplete = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();      
          this.saveTaskEvent.emit(task); 
          this.removeTimerLocalS();
          clearInterval(id);
        }
        
        if( this.StatusPlay == false ){
          this.StatusPlay= false;
          task.timeS = this.timer;
          clearInterval(id);
          this.removeTimerLocalS();
          this.saveTaskEvent.emit(task);
        }
        this.updateTimer(this.timer - 1);
        this.saveTimerLocalS(task,this.timer)
      },1000);
    }
  }
  saveTimerLocalS(task:Task,timer:any){
    localStorage.setItem('pengindTask', JSON.stringify(task));
    localStorage.setItem('timer', JSON.stringify({ timer : timer }));
  }
  removeTimerLocalS(){
    localStorage.removeItem('pengindTask');
    localStorage.removeItem('timer');  
  }
  stopTime(task:any){
    task.timeS = this.timer;
    this.saveTaskEvent.emit(task);
    this.StatusPlay = false;
  }

  resetTime(task:any){
    task.timeS = task.durationS;
    this.saveTaskEvent.emit(task);
  }

  updateTimer(num:number){
    this.timer = num;
  }

  completeTask(task:Task){
    if(this.StatusPlay){
      task.timeS=this.timer;
      this.StatusPlay=false;
    }
    this.completeTaskEvent.emit(task);  
  }

  editTask(task:any){
    this.saveTaskEvent.emit(task); 
  }
  openDialogDelete(task:Task):void{
    const dialogRef = this.dialog.open( ModalTaskDeleteComponent, {
      width: '250px',
      data: {
        description: task.description
            }
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.deleteTaskEvent.emit(task);
      }
    });
  }
  moveTask(task:any, direction:Boolean){
    let afterTask:Task;
    let CurrencyTask:Task;
    let beforeTask:Task; 
    let indexOf = this.PendingTasks.map( (x:Task) => x.id).indexOf(task.id);
    CurrencyTask = this.PendingTasks[ indexOf ];
    if(direction){
      afterTask = this.PendingTasks[ indexOf - 1];
      let temp = CurrencyTask.orden;
      CurrencyTask.orden = afterTask.orden;
      afterTask.orden = temp;
      this.saveTaskEvent.emit(CurrencyTask); 
      this.saveTaskEvent.emit(afterTask);
    }else{
      beforeTask = this.PendingTasks[ indexOf + 1];
      let temp = CurrencyTask.orden;
      CurrencyTask.orden = beforeTask.orden;
      beforeTask.orden = temp;
      this.saveTaskEvent.emit(CurrencyTask); 
      this.saveTaskEvent.emit(beforeTask); 
    }
  }
  openDialog(task:Task): void {
    
    const resultSelect=( task.durationS === 0 || task.durationS === 1800 || task.durationS === 2700 ||  task.durationS === 3600 ? task.durationS.toString() : "Personalizada") 
    const dialogRef = this.dialog.open( ModalTaskComponent, {
      width: '250px',
      data: {
        id : task.id,
        description:task.description,
        durationS:task.durationS,
        resultSelect: resultSelect,
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.editTaskfroModal.emit(data);
    });


  }

}
