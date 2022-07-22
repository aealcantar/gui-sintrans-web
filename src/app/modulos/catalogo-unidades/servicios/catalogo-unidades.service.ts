import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoUnidadesService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransUnidad}`);
    }

    buscarPorCP(cveCodigoPostal: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransCodigoPostal + `/${cveCodigoPostal}`)
    }

    buscarPorFiltros(pagina: number, tamanio: number, ooad: string, ecco: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransUnidad + `/buscar?pagina=${pagina}&tamanio=${tamanio}&ecco=${ecco}&ooad=${ooad}`);
    }

    obtenerCatalogoUnidad() {
        return of([
            {
                idUnidad: 1,
                nombreUnidad: "Aguascalientes"
            }, {
                idUnidad: 2,
                nombreUnidad: "Otro"
            }
        ])
    }

}