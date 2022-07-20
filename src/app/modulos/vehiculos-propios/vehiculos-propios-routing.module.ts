import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVehiculoPropioComponent } from './componentes/alta-vehiculo-propio/alta-vehiculo-propio.component';
import { DetalleVehiculoPropioComponent } from './componentes/detalle-vehiculo-propio/detalle-vehiculo-propio.component';
import { EditarVehiculoPropioComponent } from './componentes/editar-vehiculo-propio/editar-vehiculo-propio.component';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';

const routes: Routes = [
  { 
    path: '', 
    component: VehiculosPropiosComponent 
  },
  { 
    path: 'alta-de-vehiculo-propio', 
    component: AltaVehiculoPropioComponent 
  },
  { 
    path: 'editar-vehiculo-propio/:idVehiculo', 
    component: EditarVehiculoPropioComponent 
  },
  { 
    path: 'detalle-de-vehiculo-propio/:idVehiculo', 
    component: DetalleVehiculoPropioComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosPropiosRoutingModule { }