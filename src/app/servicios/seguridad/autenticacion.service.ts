import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { environment } from 'src/environments/environment';

export const TRANSPORTES_TOKEN = "transportes_token";
export const TRANSPORTES_USUARIO = "transportes_usuario";

@Injectable()
export class AutenticacionService {

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();
  estaLogueado$: Observable<boolean>;
  noEstaLogueado$: Observable<boolean>;

  constructor(private http: HttpClient) {

    this.estaLogueado$ = this.usuario$.pipe(map(user => !!user));
    this.noEstaLogueado$ = this.estaLogueado$.pipe(map(estaLogueado => !estaLogueado));
    const usuario = localStorage.getItem(TRANSPORTES_USUARIO);

    if (usuario) {
      this.usuarioSubject.next(JSON.parse(usuario));
    }

  }

  iniciarSesion(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.api.mssintetransOauth}/login`, { usuario, password })
      .pipe(
        tap(respuesta => {
          if (respuesta.data) {
            let usuario: Usuario = {
              matricula: respuesta.data.datosUsuario.matricula,
              nombreUsuario: respuesta.data.datosUsuario.nombreUsuario,
              rol: respuesta.data.datosUsuario.rol,
              menu: respuesta.data.menu
            };
            this.usuarioSubject.next(usuario);
            localStorage.setItem(TRANSPORTES_USUARIO, JSON.stringify(usuario));
            localStorage.setItem(TRANSPORTES_TOKEN, respuesta.data.token);
          }
        }),
      );
  }

  validarMatricula(matricula: string): Observable<any> {
    return this.http.post<any>(`${environment.api.mssintetransOauth}/`, {
      usuario: matricula
    });
  }

  actualizarContrasena(idUsuario: string, nuevaContrasena: string, confirmacionContrasena: string): Observable<any> {
    console.log(idUsuario);
    return this.http.put<any>(`${environment.api.mssintetransOauth}/`, {
      idUsuario,
      password: nuevaContrasena,
      verificarPassword: confirmacionContrasena
    });

  }

  cerrarSesion() {
    this.usuarioSubject.next(null);
    localStorage.removeItem(TRANSPORTES_USUARIO);
    localStorage.removeItem(TRANSPORTES_TOKEN);
  }

}
