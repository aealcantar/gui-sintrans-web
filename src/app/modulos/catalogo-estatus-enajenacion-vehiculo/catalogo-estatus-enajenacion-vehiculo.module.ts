import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { CatalogoEstatusEnajenacionVehiculoRoutingModule } from './catalogo-estatus-enajenacion-vehiculo-routing.module';
import { AltaEstatusEnajenacionVehiculoComponent } from './componentes/alta-estatus-enajenacion-vehiculo/alta-estatus-enajenacion-vehiculo.component';
import { CatalogoEstatusEnajenacionVehiculoComponent } from './componentes/catalogo-estatus-enajenacion-vehiculo/catalogo-estatus-enajenacion-vehiculo.component';
import { EditarEstatusEnajenacionVehiculoComponent } from './componentes/editar-estatus-enajenacion-vehiculo/editar-estatus-enajenacion-vehiculo.component';

@NgModule({
  declarations: [
    CatalogoEstatusEnajenacionVehiculoComponent,
    AltaEstatusEnajenacionVehiculoComponent,
    EditarEstatusEnajenacionVehiculoComponent
  ],
  imports: [
    CommonModule,
    CatalogoEstatusEnajenacionVehiculoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule
  ]
})
export class CatalogoEstatusEnajenacionVehiculoModule { }
