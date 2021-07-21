import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HdpiCanvasComponent} from './hdpi-canvas.component'
@NgModule({
  declarations: [HdpiCanvasComponent],
  imports: [
    CommonModule
  ],
  exports:[HdpiCanvasComponent]
})
export class HdpiCanvasModule { }
