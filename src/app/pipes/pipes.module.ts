import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { TablefilterPipe } from './tablefilter.pipe';



@NgModule({
  declarations: [ ImagenPipe, TablefilterPipe ],
  exports: [ImagenPipe, TablefilterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
