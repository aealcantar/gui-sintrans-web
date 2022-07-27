import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { TableModule } from 'primeng-lts/table';

import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { UtileriaModule } from 'src/app/compartidos/utileria/utileria.module';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { CatalogoUnidadesRoutingModule } from './catalogo-unidades-routing.module';
import { AltaUnidadComponent } from './componentes/alta-unidad/alta-unidad.component';
import { CatalogoUnidadesComponent } from './componentes/catalogo-unidades/catalogo-unidades.component';
import { DetalleUnidadComponent } from './componentes/detalle-unidad/detalle-unidad.component';
import { EditarUnidadComponent } from './componentes/editar-unidad/editar-unidad.component';
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
    ReactiveFormsModule,
    CatalogoUnidadesRoutingModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    UtileriaModule
  ],
  providers: [
    CatalogoUnidadesService,
    CatalogosService
  ]
})
export class CatalogoUnidadesModule { }
