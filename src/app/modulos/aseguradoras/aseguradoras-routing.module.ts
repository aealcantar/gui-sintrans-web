import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAseguradoraComponent } from './componentes/alta-aseguradora/alta-aseguradora.component';
import { AseguradorasComponent } from './componentes/aseguradoras/aseguradoras.component';
import { DetalleAseguradoraComponent } from './componentes/detalle-aseguradora/detalle-aseguradora.component';
import { EditarAseguradoraComponent } from './componentes/editar-aseguradora/editar-aseguradora.component';
import { AseguradoraCatalogoResolver } from './componentes/service/aseguradora-catalogo.resolver';
import { AseguradoraDetalleResolver } from './componentes/service/aseguradora-detalle.resolver';
import { AseguradoraEditResolver } from './componentes/service/aseguradora-edit.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: AseguradorasComponent ,  
    resolve : {
      respuesta : AseguradoraCatalogoResolver
    } 
  },
  { 
    path: 'alta-de-aseguradora', 
    component: AltaAseguradoraComponent ,
    
  },
  { 
    path: 'editar-aseguradora/:idAseguradora', 
    component: EditarAseguradoraComponent ,
    resolve : {
      respuesta : AseguradoraEditResolver
    } 
  },
  { 
    path: 'detalle-de-aseguradora/:idAseguradora', 
    component: DetalleAseguradoraComponent ,
    resolve : {
      respuesta : AseguradoraDetalleResolver
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : [
    AseguradoraCatalogoResolver,
    AseguradoraDetalleResolver,
    AseguradoraEditResolver,
   
  ]
})
export class AseguradorasRoutingModule { }
