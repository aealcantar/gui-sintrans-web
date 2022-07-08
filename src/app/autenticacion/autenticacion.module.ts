import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { InicioAutenticacionComponent } from './componentes/inicio-autenticacion/inicio-autenticacion.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './componentes/nueva-contrasena/nueva-contrasena.component';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';


import {CardModule} from 'primeng-lts/card';
import { BtnRegresarModule } from '../compartidos/btn-regresar/btn-regresar.module';


@NgModule({
  declarations: [
    InicioSesionComponent,
    InicioAutenticacionComponent,
    RecuperarContrasenaComponent,
    NuevaContrasenaComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    AutenticacionRoutingModule,
    BtnRegresarModule
  ]
})
export class AutenticacionModule { }
