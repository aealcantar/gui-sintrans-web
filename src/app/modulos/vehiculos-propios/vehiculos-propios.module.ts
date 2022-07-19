import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosPropiosRoutingModule } from './vehiculos-propios-routing.module';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { DialogModule } from 'primeng-lts/dialog';
import { CalendarModule } from 'primeng-lts/calendar';
import {FileUploadModule} from 'primeng-lts/fileupload';
import { AltaVehiculoPropioComponent } from './componentes/alta-vehiculo-propio/alta-vehiculo-propio.component';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';


@NgModule({
  declarations: [
    VehiculosPropiosComponent,
    AltaVehiculoPropioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VehiculosPropiosRoutingModule,
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
export class VehiculosPropiosModule { }
