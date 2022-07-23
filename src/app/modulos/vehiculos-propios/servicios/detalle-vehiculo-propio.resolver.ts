import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { CatalogoUnidadesService } from "../../catalogo-unidades/servicios/catalogo-unidades.service";
import { CatalogoVehiculosPropiosService } from "./catalogo-vehiculos-propios.service";

@Injectable()
export class DetalleVehiculoPropioResolver implements Resolve<HttpRespuesta<any>>{

    constructor(
        private catalogoUnidadesService: CatalogoUnidadesService,
        private catalogoVehiculosPropiosService: CatalogoVehiculosPropiosService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let pagina = 0;
        let tamanio = 1000;
        const catUnidades$ = this.catalogoUnidadesService.buscarPorPagina(pagina, tamanio);
        const idVehiculoPropio = route.paramMap.get('idVehiculo');
        const vehiculoPropio$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio);
        // //     map((vehiculoPropio)=> ({
        // //         ...vehiculoPropio,

        // //     })
        // // );

        // const archivoTjetaCirc$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaArchivoTjetaCirc).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaArchivoTjetaCirc))
        //     ))
        // );

        // const archivoVerificacion$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaVerificacion).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaVerificacion))
        //     ))
        // );

        // const archivoPoliza$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaPolizaSeguro).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaPolizaSeguro))
        //     ))
        // );

        // const desRutaFotoFrente$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaFotoFrente).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaFotoFrente))
        //     ))
        // );

        // const desRutaFotoLateralIzq$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaFotoLateralIzq).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaFotoLateralIzq))
        //     ))
        // );

        // const desRutaFotoLateralDer$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaFotoLateralDer).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaFotoLateralDer))
        //     ))
        // );

        // const desRutaFotoTrasera$ = this.catalogoVehiculosPropiosService.buscarPorId(idVehiculoPropio).pipe(
        //     switchMap(respuesta => this.catalogoVehiculosPropiosService.descargarArchivo(respuesta.datos[0].desRutaFotoTrasera).pipe(
        //         map((response) => convierteBlobEnFile(response, respuesta.datos[0].desRutaFotoTrasera))
        //     ))
        // );


        const catTipoVehiculo$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoVehiculo();
        const catCONUEE$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCONUEE();
        const catTipoServicio$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoServicio();
        const catVersion$ = this.catalogoVehiculosPropiosService.obtenerCatalogoVersion();
        const catTipoRegimen$ = this.catalogoVehiculosPropiosService.obtenerCatalogoTipoRegimen();
        const catCombustible$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCombustible();
        const catToneladas$ = this.catalogoVehiculosPropiosService.obtenerCatalogoToneladas();
        const catCilindros$ = this.catalogoVehiculosPropiosService.obtenerCatalogoCilindros();
        const catEstatus$ = this.catalogoVehiculosPropiosService.obtenerCatalogoEstatus();

        return forkJoin([
            catUnidades$,
            catTipoVehiculo$,
            catCONUEE$,
            catTipoServicio$,
            catVersion$,
            catTipoRegimen$,
            catCombustible$,
            catToneladas$,
            catCilindros$,
            catEstatus$,
            vehiculoPropio$,
            // archivoTjetaCirc$,
            // archivoVerificacion$,
            // archivoPoliza$,
            // desRutaFotoFrente$,
            // desRutaFotoLateralIzq$,
            // desRutaFotoLateralDer$,
            // desRutaFotoTrasera$
        ]);

    }

}