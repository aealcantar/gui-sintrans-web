import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVehiculoArrendadoComponent } from './componentes/alta-vehiculo-arrendado/alta-vehiculo-arrendado.component';
import { DetalleVehiculoArrendadoComponent } from './componentes/detalle-vehiculo-arrendado/detalle-vehiculo-arrendado.component';
import { EditarVehiculoArrendadoComponent } from './componentes/editar-vehiculo-arrendado/editar-vehiculo-arrendado.component';
import { VehiculosArrendadosComponent } from './componentes/vehiculos-arrendados/vehiculos-arrendados.component';
import { AltaVehiculoArrendadoResolver } from './servicios/alta-vehiculo-arrendado.resolver';
import { DetalleVehiculoArrendadoResolver } from './servicios/detalle-vehiculo-arrendado.resolver';
import { EditarVehiculoArrendadoResolver } from './servicios/editar-vehiculo-arrendado.resolver';
import { ListaVehiculoArrendadoResolver } from './servicios/lista-vehiculo-arrendado.resolver';

const routes: Routes = [
  {
    path: '', component: VehiculosArrendadosComponent,
    resolve: {
      respuesta: ListaVehiculoArrendadoResolver
    }
  },
  {
    path: 'alta-de-vehiculo-arrendado', component: AltaVehiculoArrendadoComponent,
    resolve: {
      respuesta: AltaVehiculoArrendadoResolver
    }
  },
  {
    path: 'editar-vehiculo-arrendado/:idVehiculo', component: EditarVehiculoArrendadoComponent,
    resolve: {
      respuesta: EditarVehiculoArrendadoResolver
    }
  },
  {
    path: 'detalle-de-vehiculo-arrendado/:idVehiculo', component: DetalleVehiculoArrendadoComponent,
    resolve: {
      respuesta: DetalleVehiculoArrendadoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AltaVehiculoArrendadoResolver,
    EditarVehiculoArrendadoResolver,
    DetalleVehiculoArrendadoResolver,
    ListaVehiculoArrendadoResolver
  ]
})
export class VehiculosArrendadosRoutingModule { }
