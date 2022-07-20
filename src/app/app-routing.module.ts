import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./modulos/inicio/inicio.module').then(m => m.InicioModule),
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./modulos/autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
  },
  {
    path: 'catalogo-de-unidades',
    loadChildren: () => import('./modulos/catalogo-unidades/catalogo-unidades.module').then(m => m.CatalogoUnidadesModule)
  },
  {
    path: 'catalogo-de-usuarios-sit',
    loadChildren: () => import('./modulos/catalogo-usuarios-sit/catalogo-usuarios-sit.module').then(m => m.CatalogoUsuariosSitModule)
  },
  {
    path: 'catalogo-de-estatus-de-enajenacion-de-vehiculo',
    loadChildren: () => import('./modulos/catalogo-estatus-enajenacion-vehiculo/catalogo-estatus-enajenacion-vehiculo.module').then(m => m.CatalogoEstatusEnajenacionVehiculoModule)
  },
  {
    path: 'catalogo-de-tarjetas-electronicas-de-combustible',
    loadChildren: () => import('./modulos/catalogo-tarjetas-electronicas-combustible/catalogo-tarjetas-electronicas-combustible.module').then(m => m.CatalogoTarjetasElectronicasCombustibleModule)
  },
  {
    path: 'vehiculos-propios',
    loadChildren: () => import('./modulos/vehiculos-propios/vehiculos-propios.module').then(m => m.VehiculosPropiosModule)
  },
  {
    path: 'vehiculos-arrendados',
    loadChildren: () => import('./modulos/vehiculos-arrendados/vehiculos-arrendados.module').then(m => m.VehiculosArrendadosModule)
  },
  {
    path: 'pagina-no-encontrada',
    component: PaginaNoEncontradaComponent
  },
  { path: 'choferes', loadChildren: () => import('./modulos/choferes/choferes.module').then(m => m.ChoferesModule) },
  { path: 'aseguradoras', loadChildren: () => import('./modulos/aseguradoras/aseguradoras.module').then(m => m.AseguradorasModule) },
  {
    path: '**',
    component: PaginaNoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'corrected',
    malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) =>
      urlSerializer.parse('/pagina-no-encontrada')
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }