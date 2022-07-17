import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoTarjetasElectronicasCombustibleRoutingModule } from './catalogo-tarjetas-electronicas-combustible-routing.module';
import { CatalogoTarjetasElectronicasCombustibleComponent } from './componentes/catalogo-tarjetas-electronicas-combustible/catalogo-tarjetas-electronicas-combustible.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { DropdownModule } from 'primeng-lts/dropdown';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { DialogModule } from 'primeng-lts/dialog';
import {CalendarModule} from 'primeng-lts/calendar';
import { AltaTarjetaElectronicaCombustibleComponent } from './componentes/alta-tarjeta-electronica-combustible/alta-tarjeta-electronica-combustible.component';
import { EditarTarjetaElectronicaCombustibleComponent } from './componentes/editar-tarjeta-electronica-combustible/editar-tarjeta-electronica-combustible.component';
import { DetalleTarjetaElectronicaCombustibleComponent } from './componentes/detalle-tarjeta-electronica-combustible/detalle-tarjeta-electronica-combustible.component';


@NgModule({
  declarations: [
    CatalogoTarjetasElectronicasCombustibleComponent,
    AltaTarjetaElectronicaCombustibleComponent,
    EditarTarjetaElectronicaCombustibleComponent,
    DetalleTarjetaElectronicaCombustibleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CatalogoTarjetasElectronicasCombustibleRoutingModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    CalendarModule
  ]
})
export class CatalogoTarjetasElectronicasCombustibleModule { }
