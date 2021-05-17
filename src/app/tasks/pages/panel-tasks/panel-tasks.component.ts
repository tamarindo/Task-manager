import { Component, OnInit, ViewChild } from '@angular/core';
import {Task} from '../../models/task'
import { TasksService } from '../../services/tasks.service';
import { MainTableComponent } from '../../components/main-table/main-table.component';
import { HistoryTableComponent } from '../../components/history-table/history-table.component';
import { ChartService } from '../../services/chart.service';


@Component({
  selector: 'app-PanelTasks',
  templateUrl: './panel-tasks.component.html',
  styleUrls: ['./panel-tasks.component.scss']
})
export class PanelTasksComponent implements OnInit {
  TableCurrency: boolean = false; 
  listTask: any[]=[];
  PendingTasks: Task[] =[];
  CompleteTasks: Task[] =[];
  dataChart: any;
 
  @ViewChild(MainTableComponent) child: any;


  @ViewChild(HistoryTableComponent) childControlPanel: any;

  constructor(   private _servicio: TasksService,
    private _servicioGrafica: ChartService, ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  changeFilter(param:any){
    
    if(param == "all" ){
      this.CompleteTasks = this.listTask.filter(  
        (x: any) => x.completed  !== false 
      );
    }
    else if (param == "bajo") {
      this.CompleteTasks = this.listTask.filter(  
        (x: any) => x.completed  !== false  && x.durationS <= (30*60)
      );
    } else if (param ==  "medio"){
      this.CompleteTasks = this.listTask.filter(  
        (x: any) => x.completed  !== false  && x.durationS > (30*60)  && x.durationS <= (60*60) 
      );
    } else if (param ==  "alto"){
      this.CompleteTasks = this.listTask.filter(  
        (x: any) => x.completed  !== false  && x.durationS > (60*60) 
      );
    }
    this.childControlPanel.updateHistoryTable(this.CompleteTasks)
  }
  getTasks(){
    this._servicio.getTasks().subscribe(
      (data) => {
        this.listTask = [];
        data.forEach(
          (x)=>{
            const auxdat:any = x.payload.doc.data();
            const objTask:Task={
              id : x.payload.doc.id,
              description :  auxdat.description,
              durationS:  auxdat.durationS,
              timeS: auxdat.timeS,
              completed:  auxdat.completed,
              orden : auxdat.orden,
            };
            if( auxdat.dateComplete != undefined){
              objTask.dateComplete = auxdat.dateComplete;
            } 
            this.listTask.push( objTask );
            this.listTask.sort((a,b)=>a.orden - b.orden) 
          }
        )
      
        this.PendingTasks = this.listTask.filter(  
          (x: any) => x.completed  !== true 
        );
        this.CompleteTasks = this.listTask.filter(  
          (x: any) => x.completed  !== false 
        );
        this.dataChart = this._servicioGrafica.organizedata(data) 

        this.child.updateTable(this.PendingTasks);
      }
    );
    
  }

  toogleTable(status:boolean){
    this.TableCurrency = ! status;
  }
  deleteTask(task:Task){
    this._servicio.deleteTask(task)
    this.child.updateTable(this.PendingTasks);
  }

  completeTask(task:Task){
    task.completed = true;
    const f:Date = new Date();
    task.dateComplete = f.getDate() + "-"+ f.getMonth()+ "-" +f.getFullYear();
    this._servicio.editTask(task)
    this.child.updateTable(this.PendingTasks).then(
      ()=>{
          this.child.updateTable(this.PendingTasks);
      }
    ).catch(
      (error:any) =>{
        console.log(error);
      }
    );  
  }
  saveTask(task:any){
    const newTask = task;
      task.orden = this.listTask.length + 1;
      var result = this._servicio.saveTask(task).then(
        ()=>{
            this.child.updateTable(this.PendingTasks);
        }
      ).catch(
        (error) =>{
          console.log(error);
        }
      );  
  }
  updateTime(task:Task){}
  editTask(task:Task){
    this._servicio.editTask(task).then(
      (x)=>{
        this.child.updateTable(this.PendingTasks);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    )
  }
  editTaskfroModal(data:any){
    let task:Task;
    task =  this.PendingTasks.filter((x)=> x.id  == data.id )[0]
    task.description = data.description;
    
    if(data.resultSelect !== "Personalizada"){
      task.timeS= parseInt(data.resultSelect);
      task.durationS = parseInt(data.resultSelect);
    }else{
      task.durationS = data.durationS;
    }
    this._servicio.editTask(task).then(
      (x)=>{
   
        this.child.updateTable(this.PendingTasks);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    )
  }
}
