import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { CatalogoUsuariosSitRoutingModule } from './catalogo-usuarios-sit-routing.module';
import { AltaUsuarioSitComponent } from './componentes/alta-usuario-sit/alta-usuario-sit.component';
import { CatalogoUsuariosSitComponent } from './componentes/catalogo-usuarios-sit/catalogo-usuarios-sit.component';
import { DetalleUsuarioSitComponent } from './componentes/detalle-usuario-sit/detalle-usuario-sit.component';
import { EditarUsuarioSitComponent } from './componentes/editar-usuario-sit/editar-usuario-sit.component';


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
    ReactiveFormsModule,
    CatalogoUsuariosSitRoutingModule,
    SeparadorModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    InputNumberModule
  ]
})
export class CatalogoUsuariosSitModule { }


