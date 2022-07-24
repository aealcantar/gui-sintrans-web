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

    buscarPorPagina(pagina: number, tamanio: number, matricula?: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(`${environment.api.mssintetransChoferes}?pagina=${pagina}&tamanio=${tamanio}&matricula=${matricula}`)
    }

    guardarChofer(chofer: Chofer, archivo: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();

        const datos = JSON.stringify(chofer);
        formData.append('chofer', datos);
        formData.append('archivo', archivo);

        return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransChoferes, formData);
    }

    actualizarChofer(idChofer: number, chofer: Chofer, archivo: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();

        const datos = JSON.stringify(chofer);
        formData.append('chofer', datos);
        formData.append('archivo', archivo);

        return this._http.put<HttpRespuesta<any>>(`${environment.api.mssintetransChoferes}/${idChofer}`, formData);
    }
}