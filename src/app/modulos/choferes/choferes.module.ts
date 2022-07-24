import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { NumberDirective } from 'src/app/directives/only-numbers.directive';
import { ChoferesService } from '../choferes/servicios/choferes.service';
import { ChoferesRoutingModule } from './choferes-routing.module';
import { AltaChoferesComponent } from './componentes/alta-choferes/alta-choferes.component';
import { ChoferesComponent } from './componentes/choferes/choferes.component';
import { DetalleChoferComponent } from './componentes/detalle-chofer/detalle-chofer.component';
import { EditarChoferComponent } from './componentes/editar-chofer/editar-chofer.component';

@NgModule({
  declarations: [
    ChoferesComponent,
    AltaChoferesComponent,
    EditarChoferComponent,
    DetalleChoferComponent,
    NumberDirective
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
  ],
  providers: [
    ChoferesService
  ]
})
export class ChoferesModule { }
