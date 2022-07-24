import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRespuesta } from '../modelos/http-respuesta.interface';

/**
 * Servicio que permite mostrar las alertas flotantes del sistema.
 */
 @Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(
    private _http: HttpClient
  ) { }

  consultarMatriculaSIAP(matricula: number): Observable<HttpRespuesta<any>> {
    return this._http.get<HttpRespuesta<any>>(environment.api.mssintetransSIAP + `/consultamatricula/${matricula}`)
  }

}