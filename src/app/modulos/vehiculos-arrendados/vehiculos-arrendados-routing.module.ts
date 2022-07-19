import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVehiculoArrendadoComponent } from './componentes/alta-vehiculo-arrendado/alta-vehiculo-arrendado.component';
import { DetalleVehiculoArrendadoComponent } from './componentes/detalle-vehiculo-arrendado/detalle-vehiculo-arrendado.component';
import { EditarVehiculoArrendadoComponent } from './componentes/editar-vehiculo-arrendado/editar-vehiculo-arrendado.component';
import { VehiculosArrendadosComponent } from './componentes/vehiculos-arrendados/vehiculos-arrendados.component';

const routes: Routes = [
  {
    path: '',
    component: VehiculosArrendadosComponent
  },
  {
    path: 'alta-de-vehiculo-arrendado',
    component: AltaVehiculoArrendadoComponent
  },
  {
    path: 'editar-vehiculo-arrendado/:idVehiculo',
    component: EditarVehiculoArrendadoComponent
  },
  {
    path: 'detalle-de-vehiculo-arrendado/:idVehiculo',
    component: DetalleVehiculoArrendadoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosArrendadosRoutingModule { }
