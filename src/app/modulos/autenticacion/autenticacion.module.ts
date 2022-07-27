import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { InicioAutenticacionComponent } from './componentes/inicio-autenticacion/inicio-autenticacion.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { NuevaContrasenaComponent } from './componentes/nueva-contrasena/nueva-contrasena.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng-lts/card';
import { UtileriaModule } from 'src/app/compartidos/utileria/utileria.module';
import { BtnRegresarModule } from '../../compartidos/btn-regresar/btn-regresar.module';


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
    BtnRegresarModule,
    UtileriaModule
  ]
})
export class AutenticacionModule { }
