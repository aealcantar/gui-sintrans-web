import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpRespuesta } from "src/app/modelos/http-respuesta.interface";
import { BaseService } from "src/app/utilerias/base-service";
import { environment } from "src/environments/environment";

@Injectable()
export class CatalogoVehiculosPropiosService extends BaseService<HttpRespuesta<any>, any> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.mssintetransTarjetaElectronica}`);
    }

    guardar(tarjetaElectronica: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('cveNumeroConvenio', tarjetaElectronica.numeroConvenio);
        formData.append('nomEmpresa', tarjetaElectronica.nombreEmpresa);
        formData.append('fecIniConvenio', tarjetaElectronica.fechaInicioConvenio);
        formData.append('fecFinConvenio', tarjetaElectronica.fechaFinConvenio);
        formData.append('impMensual', tarjetaElectronica.importeMensual);
        formData.append('canLitrosLimiteMes', tarjetaElectronica.litrosLimite);
        formData.append('idOoad', tarjetaElectronica.ooad);
        formData.append('numFolioInicial', tarjetaElectronica.folioInicial);
        formData.append('numFolioFinal', tarjetaElectronica.folioFinal);
        formData.append('canKmsRecorridos', tarjetaElectronica.km);
        formData.append('desEstatusTarjeta', tarjetaElectronica.estatus);
        formData.append('cveMatricula', tarjetaElectronica.matricula);
        return this._http.post<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica, formData)
    }

    actualizar(tarjetaElectronica: any): Observable<HttpRespuesta<any>> {
        const formData = new FormData();
        formData.append('cveNumeroConvenio', tarjetaElectronica.numeroConvenio);
        formData.append('nomEmpresa', tarjetaElectronica.nombreEmpresa);
        formData.append('fecIniConvenio', tarjetaElectronica.fechaInicioConvenio);
        formData.append('fecFinConvenio', tarjetaElectronica.fechaFinConvenio);
        formData.append('impMensual', tarjetaElectronica.importeMensual);
        formData.append('canLitrosLimiteMes', tarjetaElectronica.litrosLimite);
        formData.append('idOoad', tarjetaElectronica.ooad);
        formData.append('numFolioInicial', tarjetaElectronica.folioInicial);
        formData.append('numFolioFinal', tarjetaElectronica.folioFinal);
        formData.append('canKmsRecorridos', tarjetaElectronica.km);
        formData.append('desEstatusTarjeta', tarjetaElectronica.estatus);
        formData.append('cveMatricula', tarjetaElectronica.matricula);
        return this._http.put<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica + `${tarjetaElectronica.idTarjetaElectronica}`, formData)
    }

    buscarPorFiltros(pagina: number, tamanio: number, ooad: string, ecco: string): Observable<HttpRespuesta<any>> {
        return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransTarjetaElectronica + `/buscar?pagina=${pagina}&tamanio=${tamanio}&ooad=${ooad}&ecco=${ecco}`)
    }

    obtenerCatalogoTipoVehiculo() {
        return of([
            {
                idTipoVehiculo: "Automóvil",
                descripcion: "Automóvil"
            },
            {
                idTipoVehiculo: "SUV",
                descripcion: "SUV"
            },
            {
                idTipoVehiculo: "Microbús",
                descripcion: "Microbús"
            },
            {
                idTipoVehiculo: "Autobús",
                descripcion: "Autobús"
            },
            {
                idTipoVehiculo: "Van o Vanette",
                descripcion: "Van o Vanette"
            },
            {
                idTipoVehiculo: "Pick-up",
                descripcion: "Pick-up"
            },
            {
                idTipoVehiculo: "Camión mediano",
                descripcion: "Camión mediano"
            },
            {
                idTipoVehiculo: "Tortón y rabón",
                descripcion: "Tortón y rabón"
            },
            {
                idTipoVehiculo: "Tractocamión",
                descripcion: "Tractocamión"
            },
            {
                idTipoVehiculo: "Motocicletas",
                descripcion: "Motocicletas"
            },
            {
                idTipoVehiculo: "Otros",
                descripcion: "Otros"
            }
        ]);
    }

    obtenerCatalogoCONUEE() {
        return of([
            {
                idClasificacionCONUEE: "Servicios generales",
                descripcion: "Servicios generales"
            },
            {
                idClasificacionCONUEE: "Servidores públicos",
                descripcion: "Servidores públicos"
            },
            {
                idClasificacionCONUEE: "Servidores públicos y operación de programas públicos",
                descripcion: "Servidores públicos y operación de programas públicos"
            }
        ]);
    }

    obtenerCatalogoTipoServicio() {
        return of([
            {
                idTipoServicio: "Apoyo administrativo",
                descripcion: "Apoyo administrativo",
                cveCONUEE: "Servicios generales"
            },
            {
                idTipoServicio: "Apoyo administrativo UM",
                descripcion: "Apoyo administrativo UM",
                cveCONUEE: "Servicios generales"
            },
            {
                idTipoServicio: "Estafeta",
                descripcion: "Estafeta",
                cveCONUEE: "Servicios generales"
            },
            {
                idTipoServicio: "Abastecimiento",
                descripcion: "Abastecimiento",
                cveCONUEE: "Servicios generales"
            },
            {
                idTipoServicio: "Suministro de agua",
                descripcion: "Suministro de agua",
                cveCONUEE: "Servicios generales"
            },
            {
                idTipoServicio: "Traslado de funcionarios",
                descripcion: "Traslado de funcionarios",
                cveCONUEE: "Servidores públicos"
            },
            {
                idTipoServicio: "Programa ADEC",
                descripcion: "Programa ADEC",
                cveCONUEE: "Servidores públicos y operación de programas públicos "
            },
            {
                idTipoServicio: "Traslado de personal",
                descripcion: "Traslado de personal",
                cveCONUEE: "Servidores públicos y operación de programas públicos "
            },
            {
                idTipoServicio: "Traslado de paciente",
                descripcion: "Traslado de paciente",
                cveCONUEE: "Servidores públicos y operación de programas públicos "
            },
            {
                idTipoServicio: "Traslado pacientes terapia intensiva",
                descripcion: "Traslado pacientes terapia intensiva",
                cveCONUEE: "Servidores públicos y operación de programas públicos "
            },
            {
                idTipoServicio: "Traslado pacientes urgencias",
                descripcion: "Traslado pacientes urgencias",
                cveCONUEE: "Servidores públicos y operación de programas públicos "
            }
        ]);
    }

    obtenerCatalogoVersion() {
        return of([
            {
                idVersion: "Automático",
                descripcion: "Automático"
            },
            {
                idVersion: "Estándar",
                descripcion: "Estándar"
            },
            {
                idVersion: "Hibrido",
                descripcion: "Hibrido"
            },
            {
                idVersion: "4x4",
                descripcion: "4x4"
            },
            {
                idVersion: "Doble tracción",
                descripcion: "Doble tracción"
            }
        ]);
    }

    obtenerCatalogoTipoRegimen() {
        return of([
            {
                idTipoRegimen: "Bienestar",
                descripcion: "Bienestar"
            },
            {
                idTipoRegimen: "Ordinario",
                descripcion: "Ordinario"
            }
        ]);
    }

    obtenerCatalogoCombustible() {
        return of([
            {
                idCombustible: "Gasolina",
                descripcion: "Gasolina"
            },
            {
                idCombustible: "Gas",
                descripcion: "Gas"
            },
            {
                idCombustible: "Diesel",
                descripcion: "Diesel"
            },
            {
                idCombustible: "Híbrido",
                descripcion: "Híbrido"
            }
        ]);
    }

    obtenerCatalogoToneladas() {
        return of([
            {
                idTonelada: "0.5",
                descripcion: "0.5"
            },
            {
                idTonelada: "1",
                descripcion: "1"
            },
            {
                idTonelada: "1.5",
                descripcion: "1.5"
            },
            {
                idTonelada: "2",
                descripcion: "2"
            },
            {
                idTonelada: "2.5",
                descripcion: "2.5"
            },
            {
                idTonelada: "3",
                descripcion: "3"
            },
            {
                idTonelada: "3.5",
                descripcion: "3.5"
            }
        ]);
    }

    obtenerCatalogoCilindros() {
        return of([
            {
                idCilindro: "4",
                descripcion: "4"
            },
            {
                idCilindro: "5",
                descripcion: "5"
            },
            {
                idCilindro: "6",
                descripcion: "6"
            },
            {
                idCilindro: "8",
                descripcion: "8"
            }
        ]);
    }

    obtenerCatalogoEstatus() {
        return of([
            {
                idEstatus: "Siniestrado ",
                descripcion: "Siniestrado "
            },
            {
                idEstatus: "Siniestrado en tránsito",
                descripcion: "Siniestrado en tránsito"
            },
            {
                idEstatus: "Mantenimiento o descompostura",
                descripcion: "Mantenimiento o descompostura"
            },
            {
                idEstatus: "En préstamo",
                descripcion: "En préstamo"
            },
            {
                idEstatus: "Baja",
                descripcion: "Baja"
            }
        ]);
    }

}