import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAutenticacionComponent } from './componentes/inicio-autenticacion/inicio-autenticacion.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { NuevaContrasenaComponent } from './componentes/nueva-contrasena/nueva-contrasena.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';

const routes: Routes = [
  {
    path: '', component: InicioAutenticacionComponent,
    children: [
      {
        path: '', component: InicioSesionComponent,
      },
      {
        path: 'recuperar-contrasena', component: RecuperarContrasenaComponent
      },
      {
        path: 'nueva-contrasena/:idUsuario', component: NuevaContrasenaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
