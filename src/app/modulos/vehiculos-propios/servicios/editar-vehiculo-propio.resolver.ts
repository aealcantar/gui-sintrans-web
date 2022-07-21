import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class EditarVehiculoPropioResolver implements Resolve<any>{

    constructor(
        private catalogosService: CatalogosService,
        private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const idTarjetaElectronica = route.paramMap.get('idTarjeta');
        const tarjetaElectronica$ = this.catalogoVehiculosPropiosService.buscarElementoPorId(idTarjetaElectronica);
        let pagina = 0;
        let tamanio = 100;
        const catOoad$ = this.catalogosService.obtenerCatalogoOoad(pagina, tamanio);
        const catEstatus$ = this.catalogoVehiculosPropiosService.obtenerCatalogoEstatus();
        return forkJoin([tarjetaElectronica$, catOoad$, catEstatus$]);
    }
}