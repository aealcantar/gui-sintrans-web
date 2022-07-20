import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAseguradoraComponent } from './componentes/alta-aseguradora/alta-aseguradora.component';
import { AseguradorasComponent } from './componentes/aseguradoras/aseguradoras.component';
import { DetalleAseguradoraComponent } from './componentes/detalle-aseguradora/detalle-aseguradora.component';
import { EditarAseguradoraComponent } from './componentes/editar-aseguradora/editar-aseguradora.component';

const routes: Routes = [
  { 
    path: '', 
    component: AseguradorasComponent 
  },
  { 
    path: 'alta-de-aseguradora', 
    component: AltaAseguradoraComponent 
  },
  { 
    path: 'editar-aseguradora/:idAseguradora', 
    component: EditarAseguradoraComponent 
  },
  { 
    path: 'detalle-de-aseguradora/:idAseguradora', 
    component: DetalleAseguradoraComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AseguradorasRoutingModule { }
