import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoTarjetasElectronicasService } from "./catalogo-tarjetas-eletronicas.service";

@Injectable()
export class EditarTarjetaElectronicaResolver implements Resolve<any>{

    constructor(
        private catalogosService: CatalogosService,
        private catalogoTarjetasElectronicasService: CatalogoTarjetasElectronicasService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const idTarjetaElectronica = route.paramMap.get('idTarjeta');
        const tarjetaElectronica$ = this.catalogoTarjetasElectronicasService.buscarElementoPorId(idTarjetaElectronica);
        let pagina = 0;
        let tamanio = 100;
        const catOoad$ = this.catalogosService.obtenerCatalogoOoad(pagina, tamanio);
        const catEstatus$ = this.catalogoTarjetasElectronicasService.obtenerCatalogoEstatus();
        return forkJoin([tarjetaElectronica$, catOoad$, catEstatus$]);
    }
}