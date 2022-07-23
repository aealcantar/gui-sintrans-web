import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class DetalleCatalogoUnidadResolver implements Resolve<HttpRespuesta<any>>{

    constructor(
        private catalogoUnidadesService: CatalogoUnidadesService,
        private catalogoService: CatalogosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const idUnidad = route.paramMap.get('idUnidad');
        const unidad$ = this.catalogoUnidadesService.buscarPorId(idUnidad);
        let pagina = 0;
        let tamanino = 100;
        const catOoad$ = this.catalogoService.obtenerCatalogoOoad(pagina, tamanino);
        const catUnidad$ = this.catalogoUnidadesService.obtenerCatalogoUnidad();
        return forkJoin([unidad$, catOoad$, catUnidad$]);
    }
}