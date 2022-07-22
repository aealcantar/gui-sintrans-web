import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuarioSitComponent } from './componentes/alta-usuario-sit/alta-usuario-sit.component';
import { CatalogoUsuariosSitComponent } from './componentes/catalogo-usuarios-sit/catalogo-usuarios-sit.component';
import { DetalleUsuarioSitComponent } from './componentes/detalle-usuario-sit/detalle-usuario-sit.component';
import { EditarUsuarioSitComponent } from './componentes/editar-usuario-sit/editar-usuario-sit.component';
import { AltaUsuarioSitResolver } from './service/alta-usuario-sit.resolver';
import { CatalogoUsuarioSitResolver } from './service/catalogo-usuario-sit.resolver';
import { DetalleUsuarioSitResolver } from './service/detalle-usuario-sit.resolver';
import { EditarUsuarioSitResolver } from './service/editar-usuario-sit.resolver';

const routes: Routes = [
  {
    path: '',
    component: CatalogoUsuariosSitComponent,
    resolve: {
      respuesta: CatalogoUsuarioSitResolver,
    },
  },
  {
    path: 'alta-de-usuario-sit',
    component: AltaUsuarioSitComponent,
    resolve: {
      respuesta: AltaUsuarioSitResolver,
    },
  },
  {
    path: 'editar-usuario-sit/:idUsuario',
    component: EditarUsuarioSitComponent,
    resolve: {
      respuesta: EditarUsuarioSitResolver,
    },
  },
  {
    path: 'detalle-del-usuario-sit/:idUsuario',
    component: DetalleUsuarioSitComponent,
    resolve: {
      respuesta: DetalleUsuarioSitResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AltaUsuarioSitResolver,
    CatalogoUsuarioSitResolver,
    DetalleUsuarioSitResolver,
    DetalleUsuarioSitResolver,
  ],
})
export class CatalogoUsuariosSitRoutingModule {}
