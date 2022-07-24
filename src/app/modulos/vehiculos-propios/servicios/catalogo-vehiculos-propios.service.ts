import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { CATALOGO_CILINDROS, CATALOGO_COMBUSTIBLE, CATALOGO_CONUEE, CATALOGO_ESTATUS, CATALOGO_TIPO_REGIMEN, CATALOGO_TIPO_SERVICIO, CATALOGO_TIPO_VEHICULO, CATALOGO_TONELADA, CATALOGO_VERSION } from "src/app/utilerias/catalogos";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoVehiculosPropiosService extends BaseService<HttpRespuesta<any>, any> {

    constructor(private datePipe: DatePipe, protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransVehiculosPropios}`);
    }

    guardarRegistro(vehiculoPropio: any, matricula: any, archivos: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('archivoTjetaCirc', archivos.tarjetaCirculacion);
        formData.append('archivoVerificacion', archivos.verificacion);
        formData.append('archivoPolizaSeguro', archivos.polizaSeguro);
        formData.append('archivoFotoFrente', archivos.fotografiaFrente);
        formData.append('archivoFotoTrasera', archivos.fotografiaTrasera);
        formData.append('archivoFotoLateralIzq', archivos.fotografiaLateralIzquierdo);
        formData.append('archivoFotoLateralDer', archivos.fotografiaLateralDerecho);
        formData.append('cveEcco', vehiculoPropio.ecco);
        formData.append('numInventario', vehiculoPropio.noInventario);
        formData.append('numSerie', vehiculoPropio.noSerie);
        formData.append('numTarjeton', vehiculoPropio.noTarjeton);
        formData.append('desTipoVehiculo', vehiculoPropio.tipoVehiculo);
        formData.append('desClasifConuee', vehiculoPropio.clasifVehiculo);
        formData.append('desTipoServicio', vehiculoPropio.tipoServicio);
        formData.append('numVersionVehiculo', vehiculoPropio.version);
        formData.append('desMarca', vehiculoPropio.marca);
        formData.append('desClase', vehiculoPropio.clase);
        formData.append('desSubmarca', vehiculoPropio.submarca);
        formData.append('desModelo', vehiculoPropio.modelo);
        formData.append('desCombustible', vehiculoPropio.combustible);
        formData.append('desCombustibleXLitro', vehiculoPropio.cantCombus);
        formData.append('canCapacidadPersonas', vehiculoPropio.capPersonas);
        formData.append('canToneladas', vehiculoPropio.capToneladas);
        formData.append('canCilindros', vehiculoPropio.cilindros);
        formData.append('numMotor', vehiculoPropio.noMotor);
        formData.append('impValorContable', vehiculoPropio.valorContable);
        formData.append('numPlacas', vehiculoPropio.placas);
        formData.append('numLicenciaCofepris', vehiculoPropio.licCofepris);
        formData.append('fecVencimientoCofepris', this.datePipe.transform(vehiculoPropio.venLicCofepris, 'YYYY-MM-dd') as string);
        formData.append('desTipoRegimen', vehiculoPropio.tipoRegimen);
        formData.append('idUnidadAdscripcion', vehiculoPropio.unidad);
        formData.append('nomResponsableBienes', vehiculoPropio.respBienes);
        formData.append('desEstatusVehiculo', vehiculoPropio.estatus);
        // formData.append('desEstatusEnajenacion', vehiculoPropio.estatusEnajenacion);
        formData.append('desMotivoBaja', vehiculoPropio.motivo);
        formData.append('idAseguradora', vehiculoPropio.aseguradora);
        formData.append('fecVencTarjetaCirculacion', this.datePipe.transform(vehiculoPropio.fechaVencimiento, 'YYYY-MM-dd') as string);
        formData.append('fecProxVerificacion', this.datePipe.transform(vehiculoPropio.fechaProximaVerificacion, 'YYYY-MM-dd') as string);
        formData.append('fecVencPoliza', this.datePipe.transform(vehiculoPropio.fechaVencimientoPoliza, 'YYYY-MM-dd') as string);
        // formData.append('fechaBaja', this.datePipe.transform(vehiculoPropio.fechaBaja, 'YYYY-MM-dd'));
        formData.append('cveMatricula', matricula);
        return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransVehiculosPropios, formData)
    }

    actualizarRegistro(idVehiculo: number, vehiculoPropio: any, matricula: any, archivos: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('archivoTjetaCirc', archivos.tarjetaCirculacion);
        formData.append('archivoVerificacion', archivos.verificacion);
        formData.append('archivoPolizaSeguro', archivos.polizaSeguro);
        formData.append('archivoFotoFrente', archivos.fotografiaFrente);
        formData.append('archivoFotoTrasera', archivos.fotografiaTrasera);
        formData.append('archivoFotoLateralIzq', archivos.fotografiaLateralIzquierdo);
        formData.append('archivoFotoLateralDer', archivos.fotografiaLateralDerecho);
        formData.append('cveEcco', vehiculoPropio.ecco);
        formData.append('numInventario', vehiculoPropio.noInventario);
        formData.append('numSerie', vehiculoPropio.noSerie);
        formData.append('numTarjeton', vehiculoPropio.noTarjeton);
        formData.append('desTipoVehiculo', vehiculoPropio.tipoVehiculo);
        formData.append('desClasifConuee', vehiculoPropio.clasifVehiculo);
        formData.append('desTipoServicio', vehiculoPropio.tipoServicio);
        formData.append('numVersionVehiculo', vehiculoPropio.version);
        formData.append('desMarca', vehiculoPropio.marca);
        formData.append('desClase', vehiculoPropio.clase);
        formData.append('desSubmarca', vehiculoPropio.submarca);
        formData.append('desModelo', vehiculoPropio.modelo);
        formData.append('desCombustible', vehiculoPropio.combustible);
        formData.append('desCombustibleXLitro', vehiculoPropio.cantCombus);
        formData.append('canCapacidadPersonas', vehiculoPropio.capPersonas);
        formData.append('canToneladas', vehiculoPropio.capToneladas);
        formData.append('canCilindros', vehiculoPropio.cilindros);
        formData.append('numMotor', vehiculoPropio.noMotor);
        formData.append('impValorContable', vehiculoPropio.valorContable);
        formData.append('numPlacas', vehiculoPropio.placas);
        formData.append('numLicenciaCofepris', vehiculoPropio.licCofepris);
        formData.append('fecVencimientoCofepris', this.datePipe.transform(vehiculoPropio.venLicCofepris, 'YYYY-MM-dd') as string);
        formData.append('desTipoRegimen', vehiculoPropio.tipoRegimen);
        formData.append('idUnidadAdscripcion', vehiculoPropio.unidad);
        formData.append('nomResponsableBienes', vehiculoPropio.respBienes);
        formData.append('desEstatusVehiculo', vehiculoPropio.estatus);
        // formData.append('desEstatusEnajenacion', vehiculoPropio.estatusEnajenacion);
        formData.append('desMotivoBaja', vehiculoPropio.motivo);
        formData.append('idAseguradora', vehiculoPropio.aseguradora);
        formData.append('fecVencTarjetaCirculacion', this.datePipe.transform(vehiculoPropio.fechaVencimiento, 'YYYY-MM-dd') as string);
        formData.append('fecProxVerificacion', this.datePipe.transform(vehiculoPropio.fechaProximaVerificacion, 'YYYY-MM-dd') as string);
        formData.append('fecVencPoliza', this.datePipe.transform(vehiculoPropio.fechaVencimientoPoliza, 'YYYY-MM-dd') as string);
        // formData.append('fechaBaja', this.datePipe.transform(vehiculoPropio.fechaBaja, 'YYYY-MM-dd'));
        formData.append('cveMatricula', matricula);
        return this._http.put<HttpRespuesta<any>>(environment.api.mssintetransVehiculosPropios + "/" + idVehiculo, formData)
    }

    buscarPorFiltroEcco(pagina: number, tamanio: number, ecco: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransVehiculosPropios + "/ecco/" + ecco + `?pagina=${pagina}&tamanio=${tamanio}`);
    }

    descargarArchivo(ruta: string) {
        return this._http.post<Blob>(environment.api.mssintetransCargaArchivos + `/descargar-archivo`, { ruta }, { responseType: 'blob' as any });
    }

    obtenerCatalogoTipoVehiculo() {
        return of(CATALOGO_TIPO_VEHICULO);
    }

    obtenerCatalogoCONUEE() {
        return of(CATALOGO_CONUEE);
    }

    obtenerCatalogoTipoServicio() {
        return of(CATALOGO_TIPO_SERVICIO);
    }

    obtenerCatalogoVersion() {
        return of(CATALOGO_VERSION);
    }

    obtenerCatalogoTipoRegimen() {
        return of(CATALOGO_TIPO_REGIMEN);
    }

    obtenerCatalogoCombustible() {
        return of(CATALOGO_COMBUSTIBLE);
    }

    obtenerCatalogoToneladas() {
        return of(CATALOGO_TONELADA);
    }

    obtenerCatalogoCilindros() {
        return of(CATALOGO_CILINDROS);
    }

    obtenerCatalogoEstatus() {
        return of(CATALOGO_ESTATUS);
    }

}