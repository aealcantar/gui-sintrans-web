import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEstatusEnajenacionVehiculoComponent } from './componentes/alta-estatus-enajenacion-vehiculo/alta-estatus-enajenacion-vehiculo.component';
import { CatalogoEstatusEnajenacionVehiculoComponent } from './componentes/catalogo-estatus-enajenacion-vehiculo/catalogo-estatus-enajenacion-vehiculo.component';
import { EditarEstatusEnajenacionVehiculoComponent } from './componentes/editar-estatus-enajenacion-vehiculo/editar-estatus-enajenacion-vehiculo.component';
import { CatalogoEstatusEnajenacionVehiculoResolver } from './service/catalogo-estatus-enajenacion-vehiculo.resolver';
import { EditarErtatusEnajenacionVehiculoResolver } from './service/editar-estatus-enajenacion-vehiculo.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogoEstatusEnajenacionVehiculoComponent ,
    resolve : {
      respuesta : CatalogoEstatusEnajenacionVehiculoResolver
    }
  },
  { 
    path: 'alta-de-estatus-de-enajenacion-de-vehiculo', 
    component: AltaEstatusEnajenacionVehiculoComponent 
  },
  { 
    path: 'editar-estatus-de-enajenacion-de-vehiculo/:idEstatus', 
    component: EditarEstatusEnajenacionVehiculoComponent ,
    resolve : {
      respuesta : EditarErtatusEnajenacionVehiculoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    CatalogoEstatusEnajenacionVehiculoResolver,
    EditarErtatusEnajenacionVehiculoResolver
  ]
})
export class CatalogoEstatusEnajenacionVehiculoRoutingModule { }
