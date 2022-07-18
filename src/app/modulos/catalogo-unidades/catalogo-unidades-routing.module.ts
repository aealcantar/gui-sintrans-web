import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUnidadComponent } from './componentes/alta-unidad/alta-unidad.component';
import { CatalogoUnidadesComponent } from './componentes/catalogo-unidades/catalogo-unidades.component';
import { DetalleUnidadComponent } from './componentes/detalle-unidad/detalle-unidad.component';
import { EditarUnidadComponent } from './componentes/editar-unidad/editar-unidad.component';
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
  { path: 'alta-de-unidad', component: AltaUnidadComponent },
  {
    path: 'editar-unidad/:idUnidad', component: EditarUnidadComponent,
    resolve: {
      //catUnidad: EditarCatalogoUnidadResolver Se descomentan cuando esten los servicios
    }
  },
  {
    path: 'detalle-de-unidad/:idUnidad', component: DetalleUnidadComponent,
    resolve: {
      //catUnidad: DetalleCatalogoUnidadResolver Se descomentan cuando esten los servicios
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ListaCatalogoUnidadesResolver,
    EditarCatalogoUnidadResolver,
    DetalleCatalogoUnidadResolver
  ]
})
export class CatalogoUnidadesRoutingModule { }
