import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CatalogoUnidad } from "src/app/modelos/catalogo-unidad.interface";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class EditarCatalogoUnidadResolver implements Resolve<CatalogoUnidad>{

    constructor(private catalogoUnidadesService: CatalogoUnidadesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CatalogoUnidad> {
        const idUnidad = route.paramMap.get('idUnidad');
        return this.catalogoUnidadesService.buscarPorId(idUnidad);
    }
}