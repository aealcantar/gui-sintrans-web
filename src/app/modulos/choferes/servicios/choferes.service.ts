import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
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

    // buscarPorFiltros(pagina: number, tamanio: number, ooad: string, ecco: string): Observable<HttpRespuesta<any>> {
    //     return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica + `/buscar?pagina=${pagina}&tamanio=${tamanio}&ooad=${ooad}&ecco=${ecco}`)
    // }


    obtenerCatalogoEstatusChofer() {
        return of([
            {
                idEstatusChofer: "Baja",
                descripcion: "Baja"
            },
            {
                idEstatusChofer: "Bloqueado",
                descripcion: "Bloqueado"
            }
        ]);
    }

    obtenerCatalogoMotivos() {
        return of([
            {
                idMotivo: "Defunción",
                descripcion: "Defunción"
            },
            {
                idMotivo: "Renuncia",
                descripcion: "Renuncia"
            }
        ]);
    }

}