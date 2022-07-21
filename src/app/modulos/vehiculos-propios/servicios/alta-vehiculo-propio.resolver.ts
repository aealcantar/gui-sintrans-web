import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogosService } from "src/app/servicios/catalogos.service";
import { CatalogoUnidadesService } from "../../catalogo-unidades/servicios/catalogo-unidades.service";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class AltaVehiculoPropioResolver implements Resolve<any>{

    constructor(
        private catalogosService: CatalogosService,
        private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService,
        private catalogoUnidadesService: CatalogoUnidadesService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 100;
        const catUnidades$ = this.catalogoUnidadesService.buscarPorPagina(pagina, tamanio);
        const catTipoVehiculo$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoVehiculo();
        const catCONUEE$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCONUEE();
        const catTipoServicio$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoServicio();
        const catVersion$ = this.catalogoVehiculosPropiosService.obtenerCatalogoVersion();
        const catTipoRegimen$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoRegimen();
        const catCombustible$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCombustible();
        const catToneladas$ = this.catalogoVehiculosPropiosService.obtenerCatalogoToneladas();
        const catCilindros$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCilindros();
        const catEstatus$ = this.catalogoVehiculosPropiosService.obtenerCatalogoEstatus();
        return forkJoin([catUnidades$, catTipoVehiculo$, catCONUEE$, catTipoServicio$, catVersion$, catTipoRegimen$, catCombustible$, catToneladas$, catCilindros$, catEstatus$]);
    }
}