import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class VehiculosArrendadosService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransVehiculosArrendados}`);
    }
}