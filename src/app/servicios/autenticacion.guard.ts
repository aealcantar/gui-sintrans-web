import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AutenticacionService } from "./autenticacion.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private aut: AutenticacionService, private router: Router) {

    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.checkIfAuthenticated();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.checkIfAuthenticated();
    }

    private checkIfAuthenticated() {
        return this.aut.isLoggedIn$.pipe(map(loggedIn => loggedIn ? true : this.router.parseUrl('/login')));
    }
}