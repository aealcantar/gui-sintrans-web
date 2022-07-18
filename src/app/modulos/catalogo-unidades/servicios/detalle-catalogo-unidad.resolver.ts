import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class DetalleCatalogoUnidadResolver implements Resolve<HttpRespuesta<any>>{

    constructor(private catalogoUnidadesService: CatalogoUnidadesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        const idUnidad = route.paramMap.get('idUnidad');
        return this.catalogoUnidadesService.buscarPorId(idUnidad);
    }
}