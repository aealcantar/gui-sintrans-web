import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { ArchivoService } from 'src/app/servicios/archivo-service';
import { CatalogoUnidadesService } from '../catalogo-unidades/servicios/catalogo-unidades.service';
import { AltaVehiculoPropioComponent } from './componentes/alta-vehiculo-propio/alta-vehiculo-propio.component';
import { DetalleVehiculoPropioComponent } from './componentes/detalle-vehiculo-propio/detalle-vehiculo-propio.component';
import { EditarVehiculoPropioComponent } from './componentes/editar-vehiculo-propio/editar-vehiculo-propio.component';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';
import { CatalogoVehiculosPropiosService } from './servicios/catalogo-vehiculos-propios.service';
import { VehiculosPropiosRoutingModule } from './vehiculos-propios-routing.module';


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
    DatePipe,
    CatalogoVehiculosPropiosService,
    CatalogoUnidadesService,
    ArchivoService
  ]
})
export class VehiculosPropiosModule { }
