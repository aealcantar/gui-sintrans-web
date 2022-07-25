import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-catalogo-usuarios-sit',
  templateUrl: './catalogo-usuarios-sit.component.html',
  styleUrls: ['./catalogo-usuarios-sit.component.scss'],
})
export class CatalogoUsuariosSitComponent implements OnInit {
  mostrarModal: boolean = false;
  inicioPagina: number = 0;
  respuesta: any;
  usuarios: any[] = [];
  usuario: any;
  unidad: any;
  validarDatos: boolean = false;
  form;
  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertService: AlertasFlotantesService
  ) {
    this.form = fb.group({
      matricula: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.respuesta = this.route.snapshot.data['respuesta'];
    this.usuarios = this.respuesta!.data.content;
  }

  buscar() {
    if (this.form.valid) {
      const datos = this.form.getRawValue();
      this.usuarioService
        .get(0, datos.matricula, datos.nombreUsuario, datos.ooad)
        .subscribe((response) => {
          this.usuarios = response!.data.content;
        });
    } else {
      this.validarDatos = true;
      this.onFormChange();
    }
  }

  onFormChange() {
    this.form.valueChanges.subscribe((res) => {
      if (this.form.valid) {
        this.validarDatos = false;
      }
    });
  }

  limpiar() {
    this.usuarios = [];
    this.form.reset();
    this.usuarioService.get(0, '', '', '').subscribe((response) => {
      this.usuarios = response!.data.content;
    });
  }

  abrirModal(usuario: any) {
    this.usuario = usuario;
    this.mostrarModal = true;
  }

  eliminar() {
    this.usuarioService.eliminar(this.usuario.idUsuario).subscribe(
      (respuesta) => {
        const index = this.usuarios.findIndex(
          (u) => u.idUsuario === this.usuario.idUsuario
        );
        this.usuarios.splice(index, 1);
        this.usuario = null;
        this.mostrarModal = false;
        this.alertService.mostrar('exito', REGISTRO_ELIMINADO);
        if (this.usuarios.length === 0) {
          this.recargarTabla();
        }
      }),
      (error: HttpErrorResponse) => {
        console.error("ERROR: ", error);
      };
  }

  recargarTabla() {
    let pagina = 0;
    const filtros = this.form.getRawValue()
    this.usuarioService.get(pagina, filtros.matricula, filtros.nombreUsuario, filtros.ooad).subscribe(
      (respuesta) => {
        this.usuarios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.usuarios = this.respuesta!.data.content;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  paginador(event: any): void {
    let inicio = event.first;
    let pagina = Math.floor(inicio / 10);
    const filtros = this.form.getRawValue()
    this.usuarioService.get(pagina, filtros.matricula, filtros.nombreUsuario, filtros.ooad).subscribe(
      (respuesta) => {
        this.usuarios = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.usuarios = this.respuesta!.data.content;
        this.ordenar(event);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  ordenar(event: any): void {
    let ordenamiento = (a: any, b: any, campoOrdenamiento: string) => {
      if (a[campoOrdenamiento] > b[campoOrdenamiento]) {
        return 1;
      }
      if (a[campoOrdenamiento] < b[campoOrdenamiento]) {
        return -1;
      }
      return 0;
    };
    if (event.sortOrder === 1) {
      this.usuarios = this.usuarios.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.usuarios = this.usuarios.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}