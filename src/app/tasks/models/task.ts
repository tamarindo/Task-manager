export interface Task{
    id ?:any;
    description : string;
    durationS: number;
    timeS: number;
    completed: boolean;
    orden ?:number;
    dateComplete ?: String;
}