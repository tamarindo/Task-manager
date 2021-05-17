import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import * as fromcomponents from './components' 


@NgModule({
  declarations: [...fromcomponents.components],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...fromcomponents.components
  ]
})
export class SharedModule { }
