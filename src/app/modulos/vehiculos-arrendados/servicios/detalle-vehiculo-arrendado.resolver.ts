import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { CatalogoUnidadesService } from "../../catalogo-unidades/servicios/catalogo-unidades.service";
import { VehiculosArrendadosService } from "./vehiculos-arrendados.service";

@Injectable()
export class DetalleVehiculoArrendadoResolver implements Resolve<any>{

    constructor(
        private vehiculosArrendadosService: VehiculosArrendadosService,
        private catalogoUnidadesService: CatalogoUnidadesService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 1000;
        const catUnidades$ = this.catalogoUnidadesService.buscarPorPagina(pagina, tamanio);
        const idVehiculoPropio = route.paramMap.get('idVehiculo');
        const vehiculoArrendado$ = this.vehiculosArrendadosService.buscarPorId(idVehiculoPropio);
        const catTipoVehiculo$ = this.vehiculosArrendadosService.obtenerCatalogoTipoVehiculo();
        const catCONUEE$ = this.vehiculosArrendadosService.obtenerCatalogoCONUEE();
        const catTipoServicio$ = this.vehiculosArrendadosService.obtenerCatalogoTipoServicio();
        const catVersion$ = this.vehiculosArrendadosService.obtenerCatalogoVersion();
        const catTipoRegimen$ = this.vehiculosArrendadosService.obtenerCatalogoTipoRegimen();
        const catCombustible$ = this.vehiculosArrendadosService.obtenerCatalogoCombustible();
        const catToneladas$ = this.vehiculosArrendadosService.obtenerCatalogoToneladas();
        const catCilindros$ = this.vehiculosArrendadosService.obtenerCatalogoCilindros();
        const catEstatus$ = this.vehiculosArrendadosService.obtenerCatalogoEstatus();
        return forkJoin([catUnidades$, catTipoVehiculo$, catCONUEE$, catTipoServicio$, catVersion$, catTipoRegimen$, catCombustible$, catToneladas$, catCilindros$, catEstatus$, vehiculoArrendado$]);
    }
}