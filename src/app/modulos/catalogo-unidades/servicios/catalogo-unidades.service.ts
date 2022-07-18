import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoUnidadesService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransUnidad}`);
    }

    buscarPorFiltros(pagina: number, tamanio: number, ecco: string, ooad: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(this._base + `/buscar?pagina=${pagina}&tamanio=${tamanio}&ecco=${ecco}&ooad=${ooad}`)
    }

}