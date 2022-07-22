import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable()
export class EditarVehiculoArrendadoResolver implements Resolve<any>{

    constructor() { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return of();
    }
}