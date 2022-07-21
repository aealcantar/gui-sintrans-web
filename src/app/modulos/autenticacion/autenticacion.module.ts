import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { InicioAutenticacionComponent } from './componentes/inicio-autenticacion/inicio-autenticacion.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { NuevaContrasenaComponent } from './componentes/nueva-contrasena/nueva-contrasena.component';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';


import {CardModule} from 'primeng-lts/card';
import { BtnRegresarModule } from '../../compartidos/btn-regresar/btn-regresar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioSesionComponent,
    InicioAutenticacionComponent,
    RecuperarContrasenaComponent,
    NuevaContrasenaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    AutenticacionRoutingModule,
    BtnRegresarModule
  ]
})
export class AutenticacionModule { }
