import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './directives/only-numbers.directive';



@NgModule({
  declarations: [
    NumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective
  ]
})
export class UtileriaModule { }
