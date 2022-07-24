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
import { CatalogoUnidadesService } from '../catalogo-unidades/servicios/catalogo-unidades.service';
import { AltaVehiculoArrendadoComponent } from './componentes/alta-vehiculo-arrendado/alta-vehiculo-arrendado.component';
import { DetalleVehiculoArrendadoComponent } from './componentes/detalle-vehiculo-arrendado/detalle-vehiculo-arrendado.component';
import { EditarVehiculoArrendadoComponent } from './componentes/editar-vehiculo-arrendado/editar-vehiculo-arrendado.component';
import { VehiculosArrendadosComponent } from './componentes/vehiculos-arrendados/vehiculos-arrendados.component';
import { VehiculosArrendadosService } from './servicios/vehiculos-arrendados.service';
import { VehiculosArrendadosRoutingModule } from './vehiculos-arrendados-routing.module';

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
    CargadorArchivoModule,
    InputNumberModule
  ],
  providers:[
    VehiculosArrendadosService,
    CatalogoUnidadesService,
    DatePipe
  ]
})
export class VehiculosArrendadosModule { }
