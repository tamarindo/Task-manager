import { Component, Output , OnInit,EventEmitter, Input,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task';


export interface DialogData {
  id:number,
  description:string,
  durationS:number,
  resultSelect: string,
}

@Component({
  selector: 'app-modal-task',
  templateUrl:'modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})

export class ModalTaskComponent implements OnInit{
constructor(
  public dialogRef: MatDialogRef<ModalTaskComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) 
  {
  }

  ngOnInit():void{}


}
