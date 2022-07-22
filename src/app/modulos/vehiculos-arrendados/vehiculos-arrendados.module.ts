import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosArrendadosRoutingModule } from './vehiculos-arrendados-routing.module';
import { VehiculosArrendadosComponent } from './componentes/vehiculos-arrendados/vehiculos-arrendados.component';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { DialogModule } from 'primeng-lts/dialog';
import { CalendarModule } from 'primeng-lts/calendar';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';
import { AltaVehiculoArrendadoComponent } from './componentes/alta-vehiculo-arrendado/alta-vehiculo-arrendado.component';
import { EditarVehiculoArrendadoComponent } from './componentes/editar-vehiculo-arrendado/editar-vehiculo-arrendado.component';
import { DetalleVehiculoArrendadoComponent } from './componentes/detalle-vehiculo-arrendado/detalle-vehiculo-arrendado.component';


@NgModule({
  declarations: [
    VehiculosArrendadosComponent,
    AltaVehiculoArrendadoComponent,
    EditarVehiculoArrendadoComponent,
    DetalleVehiculoArrendadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VehiculosArrendadosRoutingModule,
    FileUploadModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    CalendarModule,
    CargadorArchivoModule
  ]
})
export class VehiculosArrendadosModule { }
