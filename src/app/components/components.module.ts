import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ ],
  exports: [ ],
  imports: [
    ChartsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ComponentsModule { }
