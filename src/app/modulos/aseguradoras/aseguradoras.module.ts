import { CommonModule } from '@angular/common';
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
import { NumberDirective } from 'src/app/directives/only-numbers.directive';
import { AseguradorasRoutingModule } from './aseguradoras-routing.module';
import { AltaAseguradoraComponent } from './componentes/alta-aseguradora/alta-aseguradora.component';
import { AseguradorasComponent } from './componentes/aseguradoras/aseguradoras.component';
import { DetalleAseguradoraComponent } from './componentes/detalle-aseguradora/detalle-aseguradora.component';
import { EditarAseguradoraComponent } from './componentes/editar-aseguradora/editar-aseguradora.component';


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
    CargadorArchivoModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule
  ]
})
export class AseguradorasModule { }
