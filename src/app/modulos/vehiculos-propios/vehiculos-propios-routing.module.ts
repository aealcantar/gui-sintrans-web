import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVehiculoPropioComponent } from './componentes/alta-vehiculo-propio/alta-vehiculo-propio.component';
import { DetalleVehiculoPropioComponent } from './componentes/detalle-vehiculo-propio/detalle-vehiculo-propio.component';
import { EditarVehiculoPropioComponent } from './componentes/editar-vehiculo-propio/editar-vehiculo-propio.component';
import { VehiculosPropiosComponent } from './componentes/vehiculos-propios/vehiculos-propios.component';
import { AltaVehiculoPropioResolver } from './servicios/alta-vehiculo-propio.resolver';
import { DetalleVehiculoPropioResolver } from './servicios/detalle-vehiculo-propio.resolver';
import { EditarVehiculoPropioResolver } from './servicios/editar-vehiculo-propio.resolver';
import { ListaVehiculoPropioResolver } from './servicios/lista-vehiculo-propio.resolver';

const routes: Routes = [
  { 
    path: '', component: VehiculosPropiosComponent,
    resolve: {
      respuesta: ListaVehiculoPropioResolver
    } 
  },
  { 
    path: 'alta-de-vehiculo-propio', component: AltaVehiculoPropioComponent,
    resolve: {
      respuesta: AltaVehiculoPropioResolver
    } 
  },
  { 
    path: 'editar-vehiculo-propio/:idVehiculo', component: EditarVehiculoPropioComponent,
    resolve: {
      respuesta: EditarVehiculoPropioResolver
    } 
  },
  { 
    path: 'detalle-de-vehiculo-propio/:idVehiculo', component: DetalleVehiculoPropioComponent,
    resolve: {
      respuesta: DetalleVehiculoPropioResolver
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ListaVehiculoPropioResolver,
    AltaVehiculoPropioResolver,
    EditarVehiculoPropioResolver,
    DetalleVehiculoPropioResolver
  ]
})
export class VehiculosPropiosRoutingModule { }
