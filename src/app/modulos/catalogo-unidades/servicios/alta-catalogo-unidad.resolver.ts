import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class AltaCatalogoUnidadResolver implements Resolve<any>{

    constructor(
        private catalogoUnidadesService: CatalogoUnidadesService,
        private catalogoService: CatalogosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanino = 100;
        const catOoad$ = this.catalogoService.obtenerCatalogoOoad(pagina, tamanino);
        const catUnidad$ = this.catalogoUnidadesService.obtenerCatalogoUnidad();
        return forkJoin([catOoad$, catUnidad$]);
    }
}