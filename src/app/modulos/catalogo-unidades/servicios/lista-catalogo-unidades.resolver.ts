import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { Unidad } from "src/app/modelos/unidad.interface";
import { CatalogoUnidadesService } from "./catalogo-unidades.service";

@Injectable()
export class ListaCatalogoUnidadesResolver implements Resolve<HttpRespuesta<any>>{

    constructor(private catalogoUnidadesService: CatalogoUnidadesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        let pagina = 0;
        let tamanio = 10;
        return this.catalogoUnidadesService.buscarPorPagina(pagina, tamanio);
    }
}