import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CatalogoUnidad } from "src/app/modelos/catalogo-unidad.interface";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class ListaCatalogoUnidadesResolver implements Resolve<CatalogoUnidad[]>{

    constructor(private catalogoUnidadesService: CatalogoUnidadesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CatalogoUnidad[]> {
        return this.catalogoUnidadesService.buscarTodos();
    }
}