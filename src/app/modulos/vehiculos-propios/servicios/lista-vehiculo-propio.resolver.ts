import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class ListaVehiculoPropioResolver implements Resolve<HttpRespuesta<any>>{

    constructor(private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        let pagina = 0;
        let tamanio = 10;
        return this.catalogoVehiculosPropiosService.buscarPorPagina(pagina, tamanio);
    }
}