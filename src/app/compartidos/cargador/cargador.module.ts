import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProgressSpinnerModule} from 'primeng-lts/progressspinner';

import { CargadorComponent } from './cargador.component';

@NgModule({
  declarations: [
    CargadorComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  exports: [
    CargadorComponent
  ]
})
export class CargadorModule { }
