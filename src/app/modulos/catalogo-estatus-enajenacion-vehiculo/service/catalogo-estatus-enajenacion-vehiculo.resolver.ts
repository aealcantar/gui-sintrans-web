import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { VehiculoEnajenacionService } from "./vehiculo-enajenacion.service";

@Injectable()
export class CatalogoEstatusEnajenacionVehiculoResolver implements Resolve<any>{
    constructor(private  vehiculoService : VehiculoEnajenacionService){}

    resolve(route: ActivatedRouteSnapshot ,state: RouterStateSnapshot):Observable<any>{
        const page = 0;
        const records  = 10;
        return this.vehiculoService.buscarPorPagina(page,records)

    }
}