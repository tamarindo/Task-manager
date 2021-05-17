import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ChartService } from '../../services/chart.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  
  @Input('data') CompleteTasks:any;
  constructor( ) {
   }

  ngOnInit(): void {

  }

}
