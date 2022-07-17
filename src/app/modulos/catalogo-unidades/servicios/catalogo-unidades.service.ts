import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CatalogoUnidad } from "src/app/modelos/catalogo-unidad.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoUnidadesService extends BaseService<CatalogoUnidad, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.baseUrl}/catalogo-unidades`);
    }

}