import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario.interface';

const AUTH_DATA = "auth_data";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private subject = new BehaviorSubject<Usuario | null>(null);

  user$: Observable<Usuario | null> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {

    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const user = localStorage.getItem(AUTH_DATA);

    if (user) {
      this.subject.next(JSON.parse(user));
    }

  }

  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>("/api/login", { email, password })
      .pipe(
        tap(user => {
          this.subject.next(user);
          localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        }),
      );
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }

}
