import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEstatusEnajenacionVehiculoComponent } from './componentes/alta-estatus-enajenacion-vehiculo/alta-estatus-enajenacion-vehiculo.component';
import { CatalogoEstatusEnajenacionVehiculoComponent } from './componentes/catalogo-estatus-enajenacion-vehiculo/catalogo-estatus-enajenacion-vehiculo.component';
import { EditarEstatusEnajenacionVehiculoComponent } from './componentes/editar-estatus-enajenacion-vehiculo/editar-estatus-enajenacion-vehiculo.component';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogoEstatusEnajenacionVehiculoComponent 
  },
  { 
    path: 'alta-de-estatus-de-enajenacion-de-vehiculo', 
    component: AltaEstatusEnajenacionVehiculoComponent 
  },
  { 
    path: 'editar-estatus-de-enajenacion-de-vehiculo/:idEstatus', 
    component: EditarEstatusEnajenacionVehiculoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoEstatusEnajenacionVehiculoRoutingModule { }
