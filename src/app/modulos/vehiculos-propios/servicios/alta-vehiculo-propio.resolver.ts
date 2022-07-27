import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { AseguradoraService } from "../../aseguradoras/componentes/service/aseguradora.service";
import { CatalogoUnidadesService } from "../../catalogo-unidades/servicios/catalogo-unidades.service";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class AltaVehiculoPropioResolver implements Resolve<any>{

    constructor(
        private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService,
        private catalogoUnidadesService: CatalogoUnidadesService,
        private aseguradoraService: AseguradoraService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 1000;
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
        const catAseguradoras$ = this.aseguradoraService.obtenerAseguradoras(0, 100, '');
        return forkJoin([catUnidades$, catTipoVehiculo$, catCONUEE$, catTipoServicio$, catVersion$, catTipoRegimen$, catCombustible$, catToneladas$, catCilindros$, catEstatus$, catAseguradoras$]);
    }
}