import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { AutenticacionService } from 'src/app/servicios/seguridad/autenticacion.service';
import { ChoferesService } from '../../servicios/choferes.service';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {

  inicioPagina: number = 0;
  respuesta!: HttpRespuesta<any> | null;
  catChoferes: Chofer[] = [];
  choferSeleccionado!: Chofer;
  ooad: string = "";
  mostrarModal: boolean = false;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private choferesService: ChoferesService,
    private fb: FormBuilder,
    private alertaService: AlertasFlotantesService,
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      matricula: ['', Validators.compose([Validators.required, Validators.maxLength(15)])]
    })
    this.respuesta = this.route.snapshot.data["respuesta"];
  }

  paginador(event?: any): void {
    let inicio = event?.first || 0;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event?.rows || 10;
    let matricula = this.editForm.get('matricula')?.value;
    this.choferesService.buscarPorPagina(pagina, tamanio, matricula).subscribe(
      (respuesta) => {
        this.catChoferes = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catChoferes = this.respuesta!.datos.content;
        if (event) {
          this.ordenar(event);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  buscarChoferPorMatricula(): void {
    this.paginador();
  }

  limpiar(): void {
    this.editForm.get('matricula')?.patchValue('');
    this.paginador();
  }

  eliminarChofer() {
    this.choferesService.eliminar(this.choferSeleccionado.idChofer).subscribe(
      (respuesta) => {
        if (respuesta.codigo === 200) {
          this.mostrarModal = false;
          this.paginador();
          this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
        }
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar('error', error.message);
        this.mostrarModal = false;
      }
    )

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
      this.catChoferes = this.catChoferes.sort((a: any, b: any) => ordenamiento(a, b, event.sortField));
    } else {
      this.catChoferes = this.catChoferes.sort((a: any, b: any) => ordenamiento(a, b, event.sortField)).reverse();
    }
  }

}
