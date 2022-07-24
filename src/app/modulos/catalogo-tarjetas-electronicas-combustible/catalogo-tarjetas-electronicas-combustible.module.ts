import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { TableModule } from 'primeng-lts/table';
import { BtnRegresarModule } from 'src/app/compartidos/btn-regresar/btn-regresar.module';
import { SeparadorModule } from 'src/app/compartidos/separador/separador.module';
import { CatalogosService } from 'src/app/servicios/catalogos.service';
import { CatalogoTarjetasElectronicasCombustibleRoutingModule } from './catalogo-tarjetas-electronicas-combustible-routing.module';
import { AltaTarjetaElectronicaCombustibleComponent } from './componentes/alta-tarjeta-electronica-combustible/alta-tarjeta-electronica-combustible.component';
import { CatalogoTarjetasElectronicasCombustibleComponent } from './componentes/catalogo-tarjetas-electronicas-combustible/catalogo-tarjetas-electronicas-combustible.component';
import { DetalleTarjetaElectronicaCombustibleComponent } from './componentes/detalle-tarjeta-electronica-combustible/detalle-tarjeta-electronica-combustible.component';
import { EditarTarjetaElectronicaCombustibleComponent } from './componentes/editar-tarjeta-electronica-combustible/editar-tarjeta-electronica-combustible.component';
import { CatalogoTarjetasElectronicasService } from './servicios/catalogo-tarjetas-eletronicas.service';


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
    ReactiveFormsModule,
    CatalogoTarjetasElectronicasCombustibleRoutingModule,
    CardModule,
    DropdownModule,
    SeparadorModule,
    TableModule,
    BtnRegresarModule,
    DialogModule,
    CalendarModule
  ],
  providers: [
    CatalogoTarjetasElectronicasService,
    CatalogosService
  ]
})
export class CatalogoTarjetasElectronicasCombustibleModule { }
