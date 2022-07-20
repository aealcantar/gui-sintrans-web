import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaChoferesComponent } from './componentes/alta-choferes/alta-choferes.component';
import { ChoferesComponent } from './componentes/choferes/choferes.component';
import { DetalleChoferComponent } from './componentes/detalle-chofer/detalle-chofer.component';
import { EditarChoferComponent } from './componentes/editar-chofer/editar-chofer.component';

const routes: Routes = [
  {
    path: '',
    component: ChoferesComponent
  },
  {
    path: 'alta-de-choferes',
    component: AltaChoferesComponent
  },
  {
    path: 'editar-chofer/:idChofer',
    component: EditarChoferComponent
  },
  {
    path: 'detalle-de-chofer/:idChofer',
    component: DetalleChoferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChoferesRoutingModule { }
