import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomFile } from '../compartidos/cargador-archivo/custom-file';
import { convierteBlobEnFile } from '../utilerias/funciones-utilerias';


@Injectable()
export class ArchivoService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Metodo generico que recupera un archivo de los servicios. La ruta es absoluta y al final de ella tiene el nombre del archivo con extension. 
   * @param ruta 
   * @returns 
   */
  descargarArchivo(ruta: string): Observable<Blob> {
    return this._http.post<Blob>(environment.api.mssintetransCargaArchivos + `/descargar-archivo`, { ruta }, { responseType: 'blob' as any });
  }

  /**
   * Regreso un observable con un archivo
   * Valida si el customfile tiene un archivo cargado por el usuario o si ya tenia un archivo recuperado de los servicios.
   * Dependiendo de ello regresara un observable con el File del usuario o con el File que viene de los servicios
   * @param contenedorArchivo 
   * @returns 
   */
  obtenerArchivoDeCustomFile(contenedorArchivo: CustomFile): Observable<File> {
    if (!contenedorArchivo.ruta) {
      return this.descargarArchivo(contenedorArchivo.ruta as string).pipe(
        map((response) => convierteBlobEnFile(response, contenedorArchivo.ruta as string))
      );
    }
    return of(contenedorArchivo?.archivo as File);
  }

  /**
   * Retorna un observable con un arreglo de archivos.
   * El orden de los archivos dentro del arreglo de la respuesta es el mismo que el orden de paso de argumentos 
   * Ejemplo: 
   * obtenerArchivosDeCustomFiles(archivo1,archivo2,archivo3....etc)
   * Salida:
   * [archivo1,archivo2,archivo3...etc]
   * @param contenedoresArchivos 
   * @returns 
   */
  obtenerArchivosDeCustomFiles(...contenedoresArchivos: CustomFile[]): Observable<File[]> {
    return forkJoin(contenedoresArchivos.map((contenedorArchivo: CustomFile) => this.obtenerArchivoDeCustomFile(contenedorArchivo)));
  }

}
