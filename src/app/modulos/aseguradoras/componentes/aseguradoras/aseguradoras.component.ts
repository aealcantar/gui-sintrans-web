import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { AseguradoraService } from '../service/aseguradora.service';

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.scss'],
})
export class AseguradorasComponent implements OnInit {

  mostrarModal: boolean = false;
  inicioPagina: number = 0;
  respuesta: any;
  aseguradoras: any[] = [];
  aseguradora: any;
  form!: FormGroup;

  constructor(
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    this.respuesta = this.router.snapshot.data['respuesta'];
    this.aseguradoras = this.respuesta.datos.content;
    this.form = this.fb.group({
      aseguradora: new FormControl('', Validators.required),
    });
  }

  buscar() {
    this.aseguradoraService.obtenerAseguradoras(0, 10, this.form.controls['aseguradora'].value).subscribe(res => {
      this.aseguradoras = []
      this.aseguradoras = res.datos.content
    },
      (error: HttpErrorResponse) => {
        console.error("ERROR: ", error);
      });
  }

  limpiar() {
    this.form.controls['aseguradora'].setValue('');
    let pagina = 0;
    let tamanio = 10;
    const aseguradora = this.form.controls['aseguradora'].value;
    this.aseguradoraService.obtenerAseguradoras(pagina, tamanio, aseguradora).subscribe(res => {
      this.aseguradoras = [];
      this.respuesta = null;
      this.respuesta = res;
      this.aseguradoras = this.respuesta.datos.content;
    },
      (error: HttpErrorResponse) => {
        console.error("ERROR: ", error);
      });
  }

  mostrarModalEliminar(aseguradora: any) {
    this.aseguradora = aseguradora;
    this.mostrarModal = true;
  }

  recargarTabla() {
    let pagina = 0;
    let tamanio = 10;
    const aseguradora = this.form.controls['aseguradora'].value;
    this.aseguradoraService.obtenerAseguradoras(pagina, tamanio, aseguradora).subscribe(res => {
      this.aseguradoras = [];
      this.respuesta = null;
      this.respuesta = res;
      this.aseguradoras = this.respuesta.datos.content;
      this.ordenar(event)
    });
  }

  paginador(event: any) {
    const inicio = event.first;
    const pagina = Math.floor(inicio / 10);
    const tamanio = event.rows;
    const aseguradora = this.form.controls['aseguradora'].value
    this.aseguradoraService.obtenerAseguradoras(pagina, tamanio, aseguradora).subscribe(res => {
      this.aseguradoras = [];
      this.respuesta = null;
      this.respuesta = res;
      this.aseguradoras = this.respuesta.datos.content;
      this.ordenar(event)
    });
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
      this.aseguradoras = this.aseguradoras.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.aseguradoras = this.aseguradoras.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

  eliminar() {
    this.cargadorService.activar();
    this.aseguradoraService.eliminar(this.aseguradora.idAseguradora).subscribe(
      (respuesta) => {
        this.cargadorService.desactivar();
        this.alertService.mostrar('exito', REGISTRO_ELIMINADO);
        const index = this.aseguradoras.findIndex((u) => u.idAseguradora === this.aseguradora.idAseguradora);
        this.aseguradoras.splice(index, 1);
        this.mostrarModal = false;
        if (this.aseguradoras.length === 0) {
          this.recargarTabla();
        }
      },
      (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        console.error("ERROR: ", error);
      }
    );
  }

}