import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng-lts/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { HeaderImssPublicoComponent } from './componentes/header-imss-publico/header-imss-publico.component';
import { AlertasFlotantesService } from './servicios/alertas-flotantes.service';
import { MessageService } from 'primeng-lts/api';
import { AlertaFlotanteModule } from './compartidos/alerta-flotante/alerta-flotante.module';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { CargadorModule } from './compartidos/cargador/cargador.module';
import { CargadorService } from './compartidos/cargador/cargador.service';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';


@NgModule({
  declarations: [
    AppComponent,
    PaginaNoEncontradaComponent,
    HeaderImssPublicoComponent,
    MenuPrincipalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    OverlayPanelModule,
    AlertaFlotanteModule,
    CargadorModule
  ],
  providers: [
    MessageService,
    AlertasFlotantesService,
    CargadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
