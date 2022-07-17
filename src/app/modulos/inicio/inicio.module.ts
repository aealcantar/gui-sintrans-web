import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ChartModule} from 'primeng-lts/chart';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ChartModule
  ]
})
export class InicioModule { }
