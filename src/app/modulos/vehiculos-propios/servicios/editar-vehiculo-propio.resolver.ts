import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogoUnidadesService } from "../../catalogo-unidades/servicios/catalogo-unidades.service";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class EditarVehiculoPropioResolver implements Resolve<any>{

    constructor(
        private catalogoUnidadesService: CatalogoUnidadesService,
        private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 1000;
        const catUnidades$ = this.catalogoUnidadesService.buscarPorPagina(pagina, tamanio);
        const catTipoVehiculo$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoVehiculo();
        const idVehiculoPropio = route.paramMap.get('idVehiculo');
        const vehiculoPropio$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio);
        const catCONUEE$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCONUEE();
        const catTipoServicio$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoServicio();
        const catVersion$ = this.catalogoVehiculosPropiosService.obtenerCatalogoVersion();
        const catTipoRegimen$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoRegimen();
        const catCombustible$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCombustible();
        const catToneladas$ = this.catalogoVehiculosPropiosService.obtenerCatalogoToneladas();
        const catCilindros$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCilindros();
        const catEstatus$ = this.catalogoVehiculosPropiosService.obtenerCatalogoEstatus();
        return forkJoin([catUnidades$, catTipoVehiculo$, catCONUEE$, catTipoServicio$, catVersion$, catTipoRegimen$, catCombustible$, catToneladas$, catCilindros$, catEstatus$, vehiculoPropio$]);
    }
}