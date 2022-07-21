import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUnidadComponent } from './componentes/alta-unidad/alta-unidad.component';
import { CatalogoUnidadesComponent } from './componentes/catalogo-unidades/catalogo-unidades.component';
import { DetalleUnidadComponent } from './componentes/detalle-unidad/detalle-unidad.component';
import { EditarUnidadComponent } from './componentes/editar-unidad/editar-unidad.component';
import { AltaCatalogoUnidadResolver } from './servicios/alta-catalogo-unidad.resolver';
import { DetalleCatalogoUnidadResolver } from './servicios/detalle-catalogo-unidad.resolver';
import { EditarCatalogoUnidadResolver } from './servicios/editar-catalogo-unidad.resolver';
import { ListaCatalogoUnidadesResolver } from './servicios/lista-catalogo-unidades.resolver';

const routes: Routes = [
  {
    path: '', component: CatalogoUnidadesComponent,
    resolve: {
      respuesta: ListaCatalogoUnidadesResolver
    }
  },
  {
    path: 'alta-de-unidad', component: AltaUnidadComponent,
    resolve: {
      respuesta: AltaCatalogoUnidadResolver
    }
  },
  {
    path: 'editar-unidad/:idUnidad', component: EditarUnidadComponent,
    resolve: {
      respuesta: EditarCatalogoUnidadResolver
    }
  },
  {
    path: 'detalle-de-unidad/:idUnidad', component: DetalleUnidadComponent,
    resolve: {
      respuesta: DetalleCatalogoUnidadResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ListaCatalogoUnidadesResolver,
    AltaCatalogoUnidadResolver,
    EditarCatalogoUnidadResolver,
    DetalleCatalogoUnidadResolver
  ]
})
export class CatalogoUnidadesRoutingModule { }
