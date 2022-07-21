import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogoTarjetasElectronicasService } from "./catalogo-tarjetas-eletronicas.service";

@Injectable()
export class ListaTarjetaElectronicaResolver implements Resolve<HttpRespuesta<any>>{

    constructor(private catalogoTarjetasElectronicasService: CatalogoTarjetasElectronicasService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpRespuesta<any>> {
        let pagina = 0;
        let tamanio = 10;
        return this.catalogoTarjetasElectronicasService.buscarPorPagina(pagina, tamanio);
    }
}