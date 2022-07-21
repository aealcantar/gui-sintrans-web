import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertasFlotantesService } from "../alertas-flotantes.service";
import { AutenticacionService, TRANSPORTES_TOKEN } from "./autenticacion.service";

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

    constructor(
        private alertasFlotantesService: AlertasFlotantesService,
        private router: Router,
        private autententicacionService: AutenticacionService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(TRANSPORTES_TOKEN);
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 || err.status === 403) {
                        this.autententicacionService.cerrarSesion();
                        this.alertasFlotantesService.mostrar('error', 'Acceso no autorizado');
                        this.router.navigateByUrl('/inicio-sesion');
                    }
                }
                return throwError(err);
            })
        );
    }

}
