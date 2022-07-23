import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { VehiculosArrendadosService } from "./vehiculos-arrendados.service";

@Injectable()
export class ListaVehiculoArrendadoResolver implements Resolve<HttpRespuesta<any>>{

    constructor(
        private vehiculosArrendadosService: VehiculosArrendadosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        let pagina = 0;
        let tamanio = 10;
        return this.vehiculosArrendadosService.buscarPorPagina(pagina, tamanio);
    }
}