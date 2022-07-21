import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaTarjetaElectronicaCombustibleComponent } from './componentes/alta-tarjeta-electronica-combustible/alta-tarjeta-electronica-combustible.component';
import { CatalogoTarjetasElectronicasCombustibleComponent } from './componentes/catalogo-tarjetas-electronicas-combustible/catalogo-tarjetas-electronicas-combustible.component';
import { DetalleTarjetaElectronicaCombustibleComponent } from './componentes/detalle-tarjeta-electronica-combustible/detalle-tarjeta-electronica-combustible.component';
import { EditarTarjetaElectronicaCombustibleComponent } from './componentes/editar-tarjeta-electronica-combustible/editar-tarjeta-electronica-combustible.component';
import { AltaTarjetaElectronicaResolver } from './servicios/alta-tarjeta-eletronica.resolver';
import { DetalleTarjetaElectronicaResolver } from './servicios/detalle-tarjeta-eletronica.resolver';
import { EditarTarjetaElectronicaResolver } from './servicios/editar-tarjeta-eletronica.resolver';
import { ListaTarjetaElectronicaResolver } from './servicios/lista-tarjeta-eletronica.resolver';

const routes: Routes = [
  { 
    path: '', component: CatalogoTarjetasElectronicasCombustibleComponent,
    resolve: {
      respuesta: ListaTarjetaElectronicaResolver
    }
  },
  { 
    path: 'alta-de-tarjeta-electronica-de-combustible', component: AltaTarjetaElectronicaCombustibleComponent,
    resolve: {
      respuesta: AltaTarjetaElectronicaResolver
    }
  },
  { 
    path: 'editar-tarjeta-electronica-de-combustible/:idTarjeta', component: EditarTarjetaElectronicaCombustibleComponent,
    resolve: {
      respuesta: EditarTarjetaElectronicaResolver
    } 
  },
  { 
    path: 'detalle-tarjeta-electronica-de-combustible/:idTarjeta', component: DetalleTarjetaElectronicaCombustibleComponent,
    resolve: {
      respuesta: DetalleTarjetaElectronicaResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ListaTarjetaElectronicaResolver,
    AltaTarjetaElectronicaResolver,
    EditarTarjetaElectronicaResolver,
    DetalleTarjetaElectronicaResolver
  ]
})
export class CatalogoTarjetasElectronicasCombustibleRoutingModule { }
