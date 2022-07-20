import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AseguradorasRoutingModule } from './aseguradoras-routing.module';
import { AseguradorasComponent } from './componentes/aseguradoras/aseguradoras.component';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { DialogModule } from 'primeng-lts/dialog';
import { CalendarModule } from 'primeng-lts/calendar';
import { CargadorArchivoModule } from 'src/app/compartidos/cargador-archivo/cargador-archivo.module';
import { AltaAseguradoraComponent } from './componentes/alta-aseguradora/alta-aseguradora.component';
import { EditarAseguradoraComponent } from './componentes/editar-aseguradora/editar-aseguradora.component';
import { DetalleAseguradoraComponent } from './componentes/detalle-aseguradora/detalle-aseguradora.component';


@NgModule({
  declarations: [
    AseguradorasComponent,
    AltaAseguradoraComponent,
    EditarAseguradoraComponent,
    DetalleAseguradoraComponent
  ],
  imports: [
    CommonModule,
    AseguradorasRoutingModule,
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
export class AseguradorasModule { }
