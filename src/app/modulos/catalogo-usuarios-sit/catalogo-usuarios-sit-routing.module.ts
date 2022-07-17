import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuarioSitComponent } from './componentes/alta-usuario-sit/alta-usuario-sit.component';
import { CatalogoUsuariosSitComponent } from './componentes/catalogo-usuarios-sit/catalogo-usuarios-sit.component';
import { DetalleUsuarioSitComponent } from './componentes/detalle-usuario-sit/detalle-usuario-sit.component';
import { EditarUsuarioSitComponent } from './componentes/editar-usuario-sit/editar-usuario-sit.component';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogoUsuariosSitComponent 
  },
  { 
    path: 'alta-de-usuario-sit', 
    component: AltaUsuarioSitComponent 
  },
  { 
    path: 'editar-usuario-sit/:idUsuario', 
    component: EditarUsuarioSitComponent 
  },
  { 
    path: 'detalle-del-usuario-sit/:idUsuario', 
    component: DetalleUsuarioSitComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoUsuariosSitRoutingModule { }
