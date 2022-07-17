import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoUsuariosSitRoutingModule } from './catalogo-usuarios-sit-routing.module';
import { CatalogoUsuariosSitComponent } from './componentes/catalogo-usuarios-sit/catalogo-usuarios-sit.component';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng-lts/dialog';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { TableModule } from 'primeng-lts/table';
import { DropdownModule } from 'primeng-lts/dropdown';
import { CardModule } from 'primeng-lts/card';
import { AltaUsuarioSitComponent } from './componentes/alta-usuario-sit/alta-usuario-sit.component';
import { EditarUsuarioSitComponent } from './componentes/editar-usuario-sit/editar-usuario-sit.component';
import { DetalleUsuarioSitComponent } from './componentes/detalle-usuario-sit/detalle-usuario-sit.component';


@NgModule({
  declarations: [
    CatalogoUsuariosSitComponent,
    AltaUsuarioSitComponent,
    EditarUsuarioSitComponent,
    DetalleUsuarioSitComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CatalogoUsuariosSitRoutingModule,
    SeparadorModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule
  ]
})
export class CatalogoUsuariosSitModule { }


