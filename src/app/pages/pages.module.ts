import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { AddareaComponent } from '../modal/area/addarea/addarea.component';









@NgModule({
  declarations: [



  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],exports:[

  ]
})
export class PagesModule { }
