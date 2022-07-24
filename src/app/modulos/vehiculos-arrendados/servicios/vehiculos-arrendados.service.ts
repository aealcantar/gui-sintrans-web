import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { CATALOGO_CILINDROS, CATALOGO_COMBUSTIBLE, CATALOGO_CONUEE, CATALOGO_ESTATUS, CATALOGO_NUMERO_CONTRATOS, CATALOGO_TIPO_REGIMEN, CATALOGO_TIPO_SERVICIO, CATALOGO_TIPO_VEHICULO, CATALOGO_TONELADA, CATALOGO_VERSION } from "src/app/utilerias/catalogos";
import { environment } from "src/environments/environment";

@Injectable()
export class VehiculosArrendadosService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransVehiculosArrendados}`);
    }

    guardarRegistro(vehiculoArrendado: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('cveEcco', vehiculoArrendado.cveEcco);
        formData.append('numTarjeton', vehiculoArrendado.numTarjeton);
        formData.append('desTipoVehiculo', vehiculoArrendado.desTipoVehiculo);
        formData.append('desModelo', vehiculoArrendado.desModelo);
        formData.append('desClasifConuee', vehiculoArrendado.desClasifConuee);
        formData.append('desTipoServicio', vehiculoArrendado.desTipoServicio);
        formData.append('desSubmarca', vehiculoArrendado.desSubmarca);
        formData.append('canCilindros', vehiculoArrendado.canCilindros);
        formData.append('desCombustible', vehiculoArrendado.desCombustible);
        formData.append('desCombustibleXLitro', vehiculoArrendado.desCombustibleXLitro);
        formData.append('canCapacidadPersonas', vehiculoArrendado.canCapacidadPersonas);
        formData.append('canToneladas', vehiculoArrendado.canToneladas);
        formData.append('numPlacas', vehiculoArrendado.numPlacas);
        formData.append('numLicenciaCofepris', vehiculoArrendado.numLicenciaCofepris);
        formData.append('fecVencimientoCofepris', vehiculoArrendado.fecVencimientoCofepris);
        formData.append('desTipoRegimen', vehiculoArrendado.desTipoRegimen);
        formData.append('idUnidadAdscripcion', vehiculoArrendado.idUnidadAdscripcion);
        formData.append('numAuxiliar', vehiculoArrendado.numAuxiliar);
        formData.append('indSustituto', vehiculoArrendado.indSustituto);
        formData.append('cveMatricula', vehiculoArrendado.cveMatricula);
        formData.append('desEstatusVehiculo', vehiculoArrendado.desEstatusVehiculo);
        formData.append('idAseguradora', vehiculoArrendado.idAseguradora);
        formData.append('numPoliza', vehiculoArrendado.numPoliza);
        formData.append('nomArrendadora', vehiculoArrendado.arrendatarios.nomArrendadora);
        formData.append('numContrato', vehiculoArrendado.arrendatarios.numContrato);
        formData.append('fecIniContrato', vehiculoArrendado.arrendatarios.fecIniContrato);
        formData.append('fecFinContrato', vehiculoArrendado.arrendatarios.fecFinContrato);
        formData.append('impCostoDiario', vehiculoArrendado.arrendatarios.impCostoDiario);
        formData.append('impCostoMensual', vehiculoArrendado.arrendatarios.impCostoMensual);
        return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransVehiculosArrendados, formData)
    }

    actualizarRegistro(idVehiculo: number, vehiculoArrendado: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('cveEcco', vehiculoArrendado.cveEcco);
        formData.append('numTarjeton', vehiculoArrendado.numTarjeton);
        formData.append('desTipoVehiculo', vehiculoArrendado.desTipoVehiculo);
        formData.append('desModelo', vehiculoArrendado.desModelo);
        formData.append('desClasifConuee', vehiculoArrendado.desClasifConuee);
        formData.append('desTipoServicio', vehiculoArrendado.desTipoServicio);
        formData.append('desSubmarca', vehiculoArrendado.desSubmarca);
        formData.append('canCilindros', vehiculoArrendado.canCilindros);
        formData.append('desCombustible', vehiculoArrendado.desCombustible);
        formData.append('desCombustibleXLitro', vehiculoArrendado.desCombustibleXLitro);
        formData.append('canCapacidadPersonas', vehiculoArrendado.canCapacidadPersonas);
        formData.append('canToneladas', vehiculoArrendado.canToneladas);
        formData.append('numPlacas', vehiculoArrendado.numPlacas);
        formData.append('numLicenciaCofepris', vehiculoArrendado.numLicenciaCofepris);
        formData.append('fecVencimientoCofepris', vehiculoArrendado.fecVencimientoCofepris);
        formData.append('desTipoRegimen', vehiculoArrendado.desTipoRegimen);
        formData.append('idUnidadAdscripcion', vehiculoArrendado.idUnidadAdscripcion);
        formData.append('numAuxiliar', vehiculoArrendado.numAuxiliar);
        formData.append('indSustituto', vehiculoArrendado.indSustituto);
        formData.append('cveMatricula', vehiculoArrendado.cveMatricula);
        formData.append('desEstatusVehiculo', vehiculoArrendado.desEstatusVehiculo);
        formData.append('idAseguradora', vehiculoArrendado.idAseguradora);
        formData.append('numPoliza', vehiculoArrendado.numPoliza);
        formData.append('nomArrendadora', vehiculoArrendado.arrendatarios.nomArrendadora);
        formData.append('numContrato', vehiculoArrendado.arrendatarios.numContrato);
        formData.append('fecIniContrato', vehiculoArrendado.arrendatarios.fecIniContrato);
        formData.append('fecFinContrato', vehiculoArrendado.arrendatarios.fecFinContrato);
        formData.append('impCostoDiario', vehiculoArrendado.arrendatarios.impCostoDiario);
        formData.append('impCostoMensual', vehiculoArrendado.arrendatarios.impCostoMensual);
        return this._http.put<HttpRespuesta<any>>(environment.api.mssintetransVehiculosArrendados + "/" + idVehiculo, formData)
    }

    buscarPorFiltroEcco(pagina: number, tamanio: number, ecco: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransVehiculosArrendados + "/ecco/" + ecco + `?pagina=${pagina}&tamanio=${tamanio}`)
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

    obtenerCatalogoNumeroContratos() {
        return of(CATALOGO_NUMERO_CONTRATOS);
    }
}