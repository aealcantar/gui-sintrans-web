import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertasFlotantesService } from "../alertas-flotantes.service";
import { AutenticacionService } from "./autenticacion.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private alertasFlotantesService: AlertasFlotantesService,
        private router: Router,
        private autententicacionService: AutenticacionService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                if (err.error instanceof ErrorEvent) {
                    this.alertasFlotantesService.mostrar('error', 'Ha ocurrido un error inesperado');
                    console.error('Ha ocurrido un error inesperado: ' + err.error.message);
                }
                if (err instanceof HttpErrorResponse) {
                    this.mostrarErrorDeServidor(err);
                }
                return throwError(err);
            })
        );
    }

    private mostrarErrorDeServidor(error: HttpErrorResponse): void {
        switch (error.status) {
            case 401:
                this.alertasFlotantesService.mostrar('error', 'Acceso no autorizado'); 
                console.error(`Acceso no autorizado: ${error.message}`);
                this.cerrarSesionConRedireccion();
                break;

            case 403:
                this.alertasFlotantesService.mostrar('error', 'Acceso no autorizado');
                console.error(`Acceso no autorizado: ${error.message}`);
                this.cerrarSesionConRedireccion();
                break;

            case 404:
                this.alertasFlotantesService.mostrar('error', 'Recurso no encontrado');
                console.error(`Recurso no encontrado: ${error.message}`);
                break;

            case 500:
                this.alertasFlotantesService.mostrar('error', 'Error interno del servidor');
                console.error(`Error interno del servidor: ${error.message}`)
                break;

            default:
                this.alertasFlotantesService.mostrar('error', 'Ha ocurrido un error inesperado');
                console.error(`Error desconocido del servidor: ${error.message}`);
                break;
        }
    }

    private cerrarSesionConRedireccion() {
        this.autententicacionService.cerrarSesion();
        this.router.navigateByUrl('/inicio-sesion');
    }

}
