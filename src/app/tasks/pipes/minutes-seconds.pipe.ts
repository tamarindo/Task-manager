import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

    transform(value: number): string {
       let minutes: number = Math.floor(value / 60);
       let segundos = value - minutes * 60
       let horas: number = Math.floor(minutes / 60);
       minutes = minutes - horas * 60;

      if( horas > 0){
        return horas + ':' +minutes + ':' + segundos;
      }else{
        return  minutes + ':' + segundos;
      }
      
    }

}
