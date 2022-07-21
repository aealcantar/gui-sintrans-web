import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesRoutingModule } from './choferes-routing.module';
import { ChoferesComponent } from './componentes/choferes/choferes.component';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { DialogModule } from 'primeng-lts/dialog';
import { CalendarModule } from 'primeng-lts/calendar';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';
import { AltaChoferesComponent } from './componentes/alta-choferes/alta-choferes.component';
import { EditarChoferComponent } from './componentes/editar-chofer/editar-chofer.component';
import { DetalleChoferComponent } from './componentes/detalle-chofer/detalle-chofer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChoferesComponent,
    AltaChoferesComponent,
    EditarChoferComponent,
    DetalleChoferComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChoferesRoutingModule,
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
export class ChoferesModule { }
