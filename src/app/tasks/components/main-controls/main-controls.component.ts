import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalTaskComponent} from '../modal-task/modal-task.component'
import {Task} from '../../models/task';

@Component({
  selector: 'app-main-controls',
  templateUrl: './main-controls.component.html',
  styleUrls: ['./main-controls.component.scss']
})

export class MainControlsComponent   implements OnInit  {

  @Input('status') TableCurrency: boolean | undefined;
  @Output() newTaskEvent = new EventEmitter<Task>();
  @Output() clickBtn = new EventEmitter<boolean>();
  @Output() changeFilter = new EventEmitter<string>();

  orderby:any = "all";

  constructor( public dialog: MatDialog ){}
  ngOnInit(): void {
  
  }
  
  addNewItem(task: Task) {
    this.newTaskEvent.emit(task);
  }
  onclick(){
    this.clickBtn.emit(  this.TableCurrency );
  }
  changeSelect():void {
    this.changeFilter.emit(this.orderby); 
  }
  openDialog(): void {
    const dialogRef = this.dialog.open( ModalTaskComponent, {
      width: '250px',
      data:{description:"",
        durationS:"0",
        resultSelect: "",
      }
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log('The dialog was closed');
      const time = parseInt( data.resultSelect == "Personalizada"?data.durationS:data.resultSelect)
      
      this.addNewItem({
        description : data.description,
        durationS:   time ,
        timeS:   time,
        completed:   false,
      });
    });
    ;
  }
}
