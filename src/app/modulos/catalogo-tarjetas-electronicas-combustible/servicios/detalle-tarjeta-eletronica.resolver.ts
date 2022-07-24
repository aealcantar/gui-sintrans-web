import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoTarjetasElectronicasService } from "./catalogo-tarjetas-eletronicas.service";

@Injectable()
export class DetalleTarjetaElectronicaResolver implements Resolve<HttpRespuesta<any>>{

    constructor(
        private catalogosService: CatalogosService, 
        private catalogoTarjetasElectronicasService: CatalogoTarjetasElectronicasService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const idTarjetaElectronica = route.paramMap.get('idTarjeta');
        const tarjetaElectronica$ = this.catalogoTarjetasElectronicasService.buscarPorId(idTarjetaElectronica);
        let pagina = 0;
        let tamanio = 100;
        const catOoad$ = this.catalogosService.obtenerCatalogoOoad(pagina, tamanio);
        const catEstatus$ = this.catalogoTarjetasElectronicasService.obtenerCatalogoEstatus();
        return forkJoin([tarjetaElectronica$, catOoad$, catEstatus$]);
    }
}