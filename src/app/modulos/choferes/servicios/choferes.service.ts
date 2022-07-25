import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Chofer } from "src/app/modelos/chofer.interface";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class ChoferesService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransChoferes}`);
    }

    buscarPorPagina(pagina: number, tamanio: number, matricula?: string, sort?: any): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(`${environment.api.mssintetransChoferes}/buscar?pagina=${pagina}&tamanio=${tamanio}&matricula=${matricula}&columna=${sort?.columna}&tipoOrdenamiento=${sort?.tipoOrdenamiento}`)
    }

    guardarChofer(chofer: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();

        formData.append('idChofer', chofer.idChofer);
        formData.append('cveMatriculaChofer', chofer.matriculaChofer);
        formData.append('nombreChofer', chofer.nombreChofer);
        formData.append('cveUnidadAdscripcion', chofer.unidadAdscripcion);
        formData.append('cveUnidadOOAD', chofer.unidadOoad);
        formData.append('estatusChofer', chofer.estatusChofer);
        formData.append('fecInicioContrato', chofer.fecInicioContrato);
        formData.append('fecFinContrato', chofer.fecFinContrato);
        formData.append('desCategoria', chofer.categoria);
        formData.append('desMotivo', chofer.motivo);
        formData.append('noLicencia', chofer.licencia);
        formData.append('cveTipoLicencia', chofer.tipoLicencia);
        formData.append('fecVigencia', chofer.fecVigencia);
        formData.append('fecExpedicion', chofer.fecExpedicion);
        formData.append('cveMatricula', chofer.matricula);
        formData.append('fecIniIncapacidad', chofer.fecIniIncapacidad);
        formData.append('fecFinIncapacidad', chofer.fecFinIncapacidad);
        formData.append('idUnidadAdscripcion', chofer.idUnidadAdscripcion);
        formData.append('archivo', chofer.archivo);

        return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransChoferes, formData);
    }

    actualizarChofer(chofer: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();

        formData.append('idChofer', chofer.idChofer);
        formData.append('cveMatriculaChofer', chofer.matriculaChofer);
        formData.append('nombreChofer', chofer.nombreChofer);
        formData.append('cveUnidadAdscripcion', chofer.unidadAdscripcion);
        formData.append('cveUnidadOOAD', chofer.unidadOoad);
        formData.append('estatusChofer', chofer.estatusChofer);
        formData.append('fecInicioContrato', chofer.fecInicioContrato);
        formData.append('fecFinContrato', chofer.fecFinContrato);
        formData.append('desCategoria', chofer.categoria);
        formData.append('desMotivo', chofer.motivo);
        formData.append('noLicencia', chofer.licencia);
        formData.append('cveTipoLicencia', chofer.tipoLicencia);
        formData.append('fecVigencia', chofer.fecVigencia);
        formData.append('fecExpedicion', chofer.fecExpedicion);
        formData.append('cveMatricula', chofer.matricula);
        formData.append('fecIniIncapacidad', chofer.fecIniIncapacidad);
        formData.append('fecFinIncapacidad', chofer.fecFinIncapacidad);
        formData.append('idUnidadAdscripcion', chofer.idUnidadAdscripcion);
        formData.append('archivo', chofer.archivo);

        return this._http.put<HttpRespuesta<any>>(`${environment.api.mssintetransChoferes}`, formData);
    }
}