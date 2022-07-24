import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Ooad } from 'src/app/modelos/ooad.interface';
import { TarjetaElectronica } from 'src/app/modelos/tarjeta-electronica.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { CatalogoTarjetasElectronicasService } from '../../servicios/catalogo-tarjetas-eletronicas.service';

@Component({
  selector: 'app-editar-tarjeta-electronica-combustible',
  templateUrl: './editar-tarjeta-electronica-combustible.component.html',
  styleUrls: ['./editar-tarjeta-electronica-combustible.component.scss'],
  providers: [DatePipe]
})
export class EditarTarjetaElectronicaCombustibleComponent implements OnInit {

  readonly POSICION_TARJETA_ELECTRONICA = 0;
  readonly POSICION_CATALOGO_OOAD = 1;
  readonly POSICION_CATALOGO_ESTATUS = 2;
  readonly ACTUALIZA_TARJETA = "La tarjeta ha sido guardada exitosamente.";
  respuesta!: HttpRespuesta<any> | null;
  catOoad: Ooad[] = [];
  catEstatus: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cargadorService: CargadorService,
    private alertaService: AlertasFlotantesService,
    private tarjetaElectronicaService: CatalogoTarjetasElectronicasService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    let tarjetaElectronica: TarjetaElectronica = respuesta[this.POSICION_TARJETA_ELECTRONICA].datos;
    this.catOoad = respuesta[this.POSICION_CATALOGO_OOAD].datos.map(
      (ooad: Ooad) => ({
        label: ooad.nomOoad,
        value: ooad.idOoad
      })
    );
    this.catEstatus = respuesta[this.POSICION_CATALOGO_ESTATUS].map(
      (estatus: any) => (
        {
          label: estatus.descripcionEstatus,
          value: estatus.idEstatus
        }
      )
    );
    this.inicializarForm(tarjetaElectronica);
  }

  inicializarForm(tarjetaElectronica: any): void {
    this.form = this.formBuilder.group({
      idTarjetaElectronica: new FormControl({ value: tarjetaElectronica.idTarjetaElectronica, disabled: true}),
      numeroConvenio: new FormControl(tarjetaElectronica.cveNumeroConvenio, Validators.required),
      nombreEmpresa: new FormControl(tarjetaElectronica.nomEmpresa, Validators.required),
      importeMensual: new FormControl(tarjetaElectronica.impMensual, Validators.required),
      fechaInicioConvenio: new FormControl(this.datePipe.transform(tarjetaElectronica.fecIniConvenio, 'dd/MM/YYYY'), Validators.required),
      fechaFinConvenio: new FormControl(this.datePipe.transform(tarjetaElectronica.fecFinConvenio, 'dd/MM/YYYY'), Validators.required),
      litrosLimite: new FormControl(tarjetaElectronica.canLitrosLimiteMes, Validators.required),
      ooad: new FormControl(tarjetaElectronica.idOoad.idOoad, Validators.required),
      folioInicial: new FormControl(tarjetaElectronica.numFolioInicial, Validators.required),
      folioFinal: new FormControl(tarjetaElectronica.numFolioFinal, Validators.required),
      km: new FormControl(tarjetaElectronica.canKmsRecorridos, Validators.required),
      estatus: new FormControl(tarjetaElectronica.desEstatusTarjeta, Validators.required)
    });
  }

  editar(): void {
    this.cargadorService.activar();
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    let tarjetaElectronica: any = {
      // idTarjetaElectronica: this.form.get("idTarjetaElectronica")?.value, 
      cveNumeroConvenio: this.form.get("numeroConvenio")?.value,
      nomEmpresa: this.form.get("nombreEmpresa")?.value,
      impMensual: this.form.get("importeMensual")?.value,
      fecIniConvenio: this.datePipe.transform(this.form.get("fechaInicioConvenio")?.value, 'YYYY-MM-dd'),
      fecFinConvenio: this.datePipe.transform(this.form.get("fechaFinConvenio")?.value, 'YYYY-MM-dd'),
      canLitrosLimiteMes: this.form.get("litrosLimite")?.value,
      idOoad: {
        idOoad: this.form.get("ooad")?.value
      },
      numFolioInicial: this.form.get("folioInicial")?.value,
      numFolioFinal: this.form.get("folioFinal")?.value,
      canKmsRecorridos: this.form.get("km")?.value,
      desEstatusTarjeta: this.form.get("estatus")?.value,
      cveMatricula: usuarioAutenticado.matricula
    };
    this.tarjetaElectronicaService.actualizar(this.form.get("idTarjetaElectronica")?.value, tarjetaElectronica).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ACTUALIZA_TARJETA);
        this.cargadorService.desactivar();
        this.router.navigate(["../.."], { relativeTo: this.route });
      },
      (error: HttpErrorResponse) => {
        this.cargadorService.desactivar();
        console.error("ERROR: ", error)
      }
    );
  }

  get f() {
    return this.form.controls;
  }

}
