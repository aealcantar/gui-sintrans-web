import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class EditarCatalogoUnidadResolver implements Resolve<any>{

    constructor(private catalogoUnidadesService: CatalogoUnidadesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const idUnidad = route.paramMap.get('idUnidad');
        const unidad$ = this.catalogoUnidadesService.buscarPorId(idUnidad);
        const catOoad$ = this.catalogoUnidadesService.obtenerCatalogoOoad();
        const catUnidad$ = this.catalogoUnidadesService.obtenerCatalogoUnidad();
        return forkJoin([unidad$, catOoad$, catUnidad$]);
    }
}