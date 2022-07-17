import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng-lts/card';
import { TableModule } from 'primeng-lts/table';
import { DropdownModule } from 'primeng-lts/dropdown';
import { DialogModule } from 'primeng-lts/dialog';

import { CatalogoUnidadesRoutingModule } from './catalogo-unidades-routing.module';
import { CatalogoUnidadesComponent } from './componentes/catalogo-unidades/catalogo-unidades.component';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { AltaUnidadComponent } from './componentes/alta-unidad/alta-unidad.component';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { EditarUnidadComponent } from './componentes/editar-unidad/editar-unidad.component';
import { DetalleUnidadComponent } from './componentes/detalle-unidad/detalle-unidad.component';
import { FormsModule } from '@angular/forms';
import { CatalogoUnidadesService } from './servicios/catalogo-unidades.service';


@NgModule({
  declarations: [
    CatalogoUnidadesComponent,
    AltaUnidadComponent,
    EditarUnidadComponent,
    DetalleUnidadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CatalogoUnidadesRoutingModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule
  ],
  providers: [
    CatalogoUnidadesService
  ]
})
export class CatalogoUnidadesModule { }
