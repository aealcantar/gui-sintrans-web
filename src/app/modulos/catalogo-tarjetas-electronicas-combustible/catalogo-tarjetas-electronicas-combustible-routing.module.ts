import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaTarjetaElectronicaCombustibleComponent } from './componentes/alta-tarjeta-electronica-combustible/alta-tarjeta-electronica-combustible.component';
import { CatalogoTarjetasElectronicasCombustibleComponent } from './componentes/catalogo-tarjetas-electronicas-combustible/catalogo-tarjetas-electronicas-combustible.component';
import { DetalleTarjetaElectronicaCombustibleComponent } from './componentes/detalle-tarjeta-electronica-combustible/detalle-tarjeta-electronica-combustible.component';
import { EditarTarjetaElectronicaCombustibleComponent } from './componentes/editar-tarjeta-electronica-combustible/editar-tarjeta-electronica-combustible.component';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogoTarjetasElectronicasCombustibleComponent 
  },
  { 
    path: 'alta-de-tarjeta-electronica-de-combustible', 
    component: AltaTarjetaElectronicaCombustibleComponent 
  },
  { 
    path: 'editar-tarjeta-electronica-de-combustible/:idTarjeta', 
    component: EditarTarjetaElectronicaCombustibleComponent 
  },
  { 
    path: 'detalle-tarjeta-electronica-de-combustible/:idTarjeta', 
    component: DetalleTarjetaElectronicaCombustibleComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoTarjetasElectronicasCombustibleRoutingModule { }
