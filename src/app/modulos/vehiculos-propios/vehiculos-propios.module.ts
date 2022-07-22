import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { VehiculosPropiosRoutingModule } from './vehiculos-propios-routing.module';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EditarVehiculoPropioComponent } from './componentes/editar-vehiculo-propio/editar-vehiculo-propio.component';
import { DetalleVehiculoPropioComponent } from './componentes/detalle-vehiculo-propio/detalle-vehiculo-propio.component';
import { CatalogoVehiculosPropiosService } from './servicios/catalogo-vehiculos-propios.service';
import { CatalogoUnidadesService } from '../catalogo-unidades/servicios/catalogo-unidades.service';
import { InputNumberModule } from 'primeng-lts/inputnumber';


@NgModule({
  declarations: [
    VehiculosPropiosComponent,
    AltaVehiculoPropioComponent,
    EditarVehiculoPropioComponent,
    DetalleVehiculoPropioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VehiculosPropiosRoutingModule,
    FileUploadModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    CalendarModule,
    CargadorArchivoModule,
    InputNumberModule
  ],
  providers: [
    CatalogoVehiculosPropiosService,
    CatalogoUnidadesService,
    DatePipe
  ]
})
export class VehiculosPropiosModule { }
