import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoTarjetasElectronicasService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransTarjetaElectronica}`);
    }

    // guardar(tarjetaElectronica: any): Observable<HttpRespuesta<any>> {
    //     const formData = new FormData();
    //     formData.append('cveNumeroConvenio', tarjetaElectronica.numeroConvenio);
    //     formData.append('nomEmpresa', tarjetaElectronica.nombreEmpresa);
    //     formData.append('fecIniConvenio', tarjetaElectronica.fechaInicioConvenio);
    //     formData.append('fecFinConvenio', tarjetaElectronica.fechaFinConvenio);
    //     formData.append('impMensual', tarjetaElectronica.importeMensual);
    //     formData.append('canLitrosLimiteMes', tarjetaElectronica.litrosLimite);
    //     formData.append('idOoad', tarjetaElectronica.ooad);
    //     formData.append('numFolioInicial', tarjetaElectronica.folioInicial);
    //     formData.append('numFolioFinal', tarjetaElectronica.folioFinal);
    //     formData.append('canKmsRecorridos', tarjetaElectronica.km);
    //     formData.append('desEstatusTarjeta', tarjetaElectronica.estatus);
    //     formData.append('cveMatricula', tarjetaElectronica.matricula);
    //     return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica, formData)
    // }

    // actualizar(tarjetaElectronica: any): Observable<HttpRespuesta<any>> {
    //     const formData = new FormData();
    //     formData.append('cveNumeroConvenio', tarjetaElectronica.numeroConvenio);
    //     formData.append('nomEmpresa', tarjetaElectronica.nombreEmpresa);
    //     formData.append('fecIniConvenio', tarjetaElectronica.fechaInicioConvenio);
    //     formData.append('fecFinConvenio', tarjetaElectronica.fechaFinConvenio);
    //     formData.append('impMensual', tarjetaElectronica.importeMensual);
    //     formData.append('canLitrosLimiteMes', tarjetaElectronica.litrosLimite);
    //     formData.append('idOoad', tarjetaElectronica.ooad);
    //     formData.append('numFolioInicial', tarjetaElectronica.folioInicial);
    //     formData.append('numFolioFinal', tarjetaElectronica.folioFinal);
    //     formData.append('canKmsRecorridos', tarjetaElectronica.km);
    //     formData.append('desEstatusTarjeta', tarjetaElectronica.estatus);
    //     formData.append('cveMatricula', tarjetaElectronica.matricula);
    //     return this._http.put<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica + `${tarjetaElectronica.idTarjetaElectronica}`, formData)
    // }

    buscarPorFiltros(pagina: number, tamanio: number, convenio: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica + `/?pagina=${pagina}&tamanio=${tamanio}&numConvenio=${convenio}`)
    }

    obtenerCatalogoEstatus() {
        return of([
            {
                idEstatus: "Activa",
                descripcionEstatus: "Activa"
            },
            {
                idEstatus: "Dañada",
                descripcionEstatus: "Dañada"
            },
            {
                idEstatus: "Desactiva",
                descripcionEstatus: "Desactiva"
            }
        ])
    }

}