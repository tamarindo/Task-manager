import { Component, Output , OnInit,EventEmitter, Input,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-task',
  templateUrl:'modal-delete-task.component.html',
  styleUrls: ['./modal-delete-task.component.scss'],
})

export class ModalTaskDeleteComponent implements OnInit{
  description:string="";

constructor(
  public dialogRef: MatDialogRef<ModalTaskDeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any) 
  {
  }

  ngOnInit():void{
    this.description = this.data.description;
  }

  confirmar(value:boolean){
    this.dialogRef.close(value)
  }

}
