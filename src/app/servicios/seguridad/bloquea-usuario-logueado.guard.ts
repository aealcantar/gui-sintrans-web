import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AutenticacionService } from "./autenticacion.service";

@Injectable()
export class BloqueaUsuarioLogueadoGuard implements CanActivate, CanActivateChild {

    constructor(private aut: AutenticacionService, private router: Router) {

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.validarSiEstaAutenticado();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.validarSiEstaAutenticado();
    }

    private validarSiEstaAutenticado() {
        return this.aut.estaLogueado$.pipe(map(estaLogueado => estaLogueado ? false : true));
    }

}
