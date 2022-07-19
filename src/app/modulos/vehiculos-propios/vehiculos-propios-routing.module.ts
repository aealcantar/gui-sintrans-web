import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVehiculoPropioComponent } from './componentes/alta-vehiculo-propio/alta-vehiculo-propio.component';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';

const routes: Routes = [
  { 
    path: '', 
    component: VehiculosPropiosComponent 
  },
  { 
    path: 'alta-de-vehiculo-propio', 
    component: AltaVehiculoPropioComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosPropiosRoutingModule { }
