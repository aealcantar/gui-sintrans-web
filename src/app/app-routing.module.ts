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
    path: 'inicio-sesion',
    loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule),
  },
  {
    path: 'pagina-no-encontrada',
    component: PaginaNoEncontradaComponent
  },
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
