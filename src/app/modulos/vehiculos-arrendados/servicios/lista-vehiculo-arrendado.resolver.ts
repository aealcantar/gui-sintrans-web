import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { VehiculosArrendadosService } from "./vehiculos-arrendados.service";

@Injectable()
export class ListaVehiculoArrendadoResolver implements Resolve<HttpRespuesta<any>>{

    constructor(
        private vehiculosArrendadosService: VehiculosArrendadosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 10;
        const vehiculosArrendados$ = this.vehiculosArrendadosService.buscarPorPagina(pagina, tamanio);
        const catTipoServicio$ = this.vehiculosArrendadosService.obtenerCatalogoTipoServicio();
        const catEstatus$ = this.vehiculosArrendadosService.obtenerCatalogoEstatus();
        return forkJoin([vehiculosArrendados$, catTipoServicio$, catEstatus$]);
    }
}