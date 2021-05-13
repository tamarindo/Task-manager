import { Timestamp } from "rxjs";

export class  Task{
    id:number = 0;
    name: string = '';
    description : string = "";
    durationS: number = 0;
    timeS: number = 0;
    status:String = '';
    completed: boolean = false
}