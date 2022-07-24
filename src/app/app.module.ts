import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng-lts/toast';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng-lts/api';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertaFlotanteModule } from './compartidos/alerta-flotante/alerta-flotante.module';
import { CargadorModule } from './compartidos/cargador/cargador.module';
import { CargadorService } from './compartidos/cargador/cargador.service';
import { HeaderImssPublicoComponent } from './componentes/header-imss-publico/header-imss-publico.component';
import { MenuPrincipalComponent } from './componentes/menu-principal/menu-principal.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { AlertasFlotantesService } from './servicios/alertas-flotantes.service';
import { AutenticacionInterceptor } from './servicios/seguridad/autenticacion.interceptor';
import { AutenticacionService } from './servicios/seguridad/autenticacion.service';
import { BloqueaUsuarioLogueadoGuard } from './servicios/seguridad/bloquea-usuario-logueado.guard';
import { ErrorInterceptor } from './servicios/seguridad/error.interceptor';
import { PermiteUsuarioLogueadoGuard } from './servicios/seguridad/permite-usuario-logueado.guard';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    PaginaNoEncontradaComponent,
    HeaderImssPublicoComponent,
    MenuPrincipalComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    OverlayPanelModule,
    AlertaFlotanteModule,
    CargadorModule
  ],
  providers: [
    AutenticacionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    PermiteUsuarioLogueadoGuard,
    BloqueaUsuarioLogueadoGuard,
    MessageService,
    AlertasFlotantesService,
    CargadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
