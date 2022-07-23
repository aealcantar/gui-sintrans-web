import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { CATALOGO_CILINDROS, CATALOGO_COMBUSTIBLE, CATALOGO_CONUEE, CATALOGO_ESTATUS, CATALOGO_TIPO_REGIMEN, CATALOGO_TIPO_SERVICIO, CATALOGO_TIPO_VEHICULO, CATALOGO_TONELADA, CATALOGO_VERSION } from "src/app/utilerias/catalogos";
import { environment } from "src/environments/environment";

@Injectable()
export class VehiculosArrendadosService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransVehiculosArrendados}`);
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
}