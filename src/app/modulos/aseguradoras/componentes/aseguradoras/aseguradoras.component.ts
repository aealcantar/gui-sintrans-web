import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
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
  form;
  MENSAJE = 'El registro ah sido eliminado exitosamente.';
  constructor(
    private aseguradoraService: AseguradoraService,
    private alertService: AlertasFlotantesService,
    private router: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      aseguradora: new FormControl('', Validators.required),
    });
  }
  buscar() {
    this.aseguradoraService
      .obtenerAseguradoras(0, 10, this.form.controls['aseguradora'].value, '')
      .subscribe((res) => {
        console.log(res);
        this.aseguradoras = [];
        this.aseguradoras = res.datos.content;
      });
  }
  limpiar() {
    this.form.controls['aseguradora'].setValue('');
    this.aseguradoras = [];
    this.aseguradoraService
      .obtenerAseguradoras(0, 10, '', '')
      .subscribe((res) => {
        this.respuesta = res;
        this.aseguradoras = res.datos.content;
      });
  }

  ngOnInit(): void {
    this.respuesta = this.router.snapshot.data['respuesta'];
    console.log(this.respuesta);
    this.aseguradoras = this.respuesta.datos.content;
  }

  mostrarModalEliminar(aseguradora: any) {
    this.aseguradora = aseguradora;
    this.mostrarModal = true;
  }
  get f() {
    return this.form.controls;
  }
  paginador(event: any) {
    console.log(event);
    const inicio = event.first;
    const pagina = Math.floor(inicio / 10);
    const tamanio = event.rows;
    const aseguradora = this.form.controls['aseguradora'].value;
    let sort = 'idAseguradora,desc';
    if (event.sortField != undefined) {
      const column = event.sortField;
      const orden = event.sortOrder == 1 ? 'asc' : 'desc';
      sort = `${column},${orden}`;
    }
    console.log(sort);
    this.aseguradoraService
      .obtenerAseguradoras(pagina, tamanio, aseguradora, sort)
      .subscribe((res) => {
        this.aseguradoras = [];
        this.respuesta = null;
        this.respuesta = res;
        this.aseguradoras = this.respuesta.datos.content;
        console.log(this.aseguradoras);
        // this.ordenar(event);
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
      this.aseguradoras = this.aseguradoras.sort((a: any, b: any) =>
        ordenamiento(a, b, event.sortField)
      );
    } else {
      this.aseguradoras = this.aseguradoras
        .sort((a: any, b: any) => ordenamiento(a, b, event.sortField))
        .reverse();
    }
  }
  eliminar() {
    this.aseguradoraService
      .eliminar(this.aseguradora.idAseguradora)
      .subscribe((response) => {
        this.alertService.mostrar('exito', this.MENSAJE);
        const index = this.aseguradoras.findIndex(
          (u) => u.idAseguradora === this.aseguradora.idAseguradora
        );
        this.aseguradoras.splice(index, 1);
        this.mostrarModal = false;
      });
  }
}
