import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Task} from '../models/task'

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor( 
    private fireStore:AngularFirestore
  ) { }

  getTasks(){
    return this.fireStore.collection("task").snapshotChanges();
  }
   deleteTask(task:Task){
    const TaskRef: AngularFirestoreDocument<Task> = this.fireStore.doc(`task/${task.id}`);
    return TaskRef.delete(); 
  }
  saveTask(task:Task){
    return this.fireStore.collection('task').add(task); 
  }
  editTask(task:Task){
    const TaskRef: AngularFirestoreDocument<Task> = this.fireStore.doc(`task/${task.id}`);
    return TaskRef.update(task); 
  }
}
