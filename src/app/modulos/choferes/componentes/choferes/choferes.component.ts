import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { Chofer } from 'src/app/modelos/chofer.interface';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { CATALOGO_ESTATUS_CHOFER } from 'src/app/utilerias/catalogos';
import { REGISTRO_ELIMINADO } from 'src/app/utilerias/constantes';
import { ChoferesService } from '../../servicios/choferes.service';
@Component({
  selector: 'app-choferes',
  templateUrl: './choferes.component.html',
  styleUrls: ['./choferes.component.scss']
})
export class ChoferesComponent implements OnInit {

  inicioPagina: number = 0;
  respuesta!: HttpRespuesta<any> | null;
  catChoferes: Chofer[] = [];
  choferSeleccionado: Chofer | null = null;
  ooad: string = "";
  mostrarModal: boolean = false;
  editForm!: FormGroup;
  catEstatus: any[] = CATALOGO_ESTATUS_CHOFER;

  constructor(
    private route: ActivatedRoute,
    private choferesService: ChoferesService,
    private fb: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      matricula: ['', Validators.compose([Validators.required, Validators.maxLength(15)])]
    })
    this.respuesta = this.route.snapshot.data["respuesta"];
  }

  obtenerNombreEstatusPorId(idEstatus: string) {
    let valor = this.catEstatus.find((e) => e.value === parseInt(idEstatus));
    return valor.label;
  }

  paginador(event?: any): void {
    let inicio = event?.first || 0;
    let pagina = Math.floor(inicio / 10);
    let tamanio = event?.rows || 10;
    let matricula = this.editForm.get('matricula')?.value;
    let sort = {
      columna: event?.sortField || '',
      tipoOrdenamiento: this.obtenerOrden(event?.sortOrder || 0),
    }
    this.choferesService.buscarPorPagina(pagina, tamanio, matricula, sort).subscribe(
      (respuesta) => {
        this.catChoferes = [];
        this.respuesta = null;
        this.respuesta = respuesta;
        this.catChoferes = this.respuesta!.datos.content.map(
          (chofer: any) => {
            return ({
              ...chofer,
              estatusChofer: this.obtenerNombreEstatusPorId(chofer.estatusChofer)
            })
          }
        );
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
    this.inicioPagina = 0;
    this.paginador();
  }

  mostrarModalEliminar(chofer: Chofer): void {
    this.choferSeleccionado = chofer;
    this.mostrarModal = true;
  }

  eliminar() {
    this.cargadorService.activar();
    this.choferesService.eliminar(this.choferSeleccionado?.idChofer).subscribe(
      (respuesta) => {
        if (respuesta.codigo === 200) {
          let indiceChofer = this.catChoferes.findIndex((c) => c.idChofer === this.choferSeleccionado?.idChofer);
          this.catChoferes.splice(indiceChofer, 1);
          this.choferSeleccionado = null;
          this.cargadorService.desactivar();
          this.mostrarModal = false;
          this.alertaService.mostrar('exito', REGISTRO_ELIMINADO);
          if (this.catChoferes.length === 0) {
            this.paginador();
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.alertaService.mostrar('error', error.message);
        this.mostrarModal = false;
        this.cargadorService.desactivar();
      }
    )

  }

  obtenerOrden(idOrder: number) {
    switch (idOrder) {
      case 1:
        return 'asc';
      case -1:
        return 'desc';
      default:
        return '';
    }
  }

}
