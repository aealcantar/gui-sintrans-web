import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Ooad } from 'src/app/modelos/ooad.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { CatalogoTarjetasElectronicasService } from '../../servicios/catalogo-tarjetas-eletronicas.service';

@Component({
  selector: 'app-alta-tarjeta-electronica-combustible',
  templateUrl: './alta-tarjeta-electronica-combustible.component.html',
  styleUrls: ['./alta-tarjeta-electronica-combustible.component.scss'],
  providers: [DatePipe]
})
export class AltaTarjetaElectronicaCombustibleComponent implements OnInit {

  readonly POSICION_CATALOGO_OOAD = 0;
  readonly POSICION_CATALOGO_ESTATUS = 1;
  readonly ALTA_TARJETA = "La tarjeta ha sido dada de alta exitosamente.";
  respuesta!: HttpRespuesta<any> | null;
  catOoad: Ooad[] = [];
  catEstatus: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertaService: AlertasFlotantesService,
    private cargadorService: CargadorService,
    private tarjetaElectronicaService: CatalogoTarjetasElectronicasService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
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
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      numeroConvenio: new FormControl('', Validators.required),
      nombreEmpresa: new FormControl('', Validators.required),
      importeMensual: new FormControl('', Validators.required),
      fechaInicioConvenio: new FormControl(null, Validators.required),
      fechaFinConvenio: new FormControl(null, Validators.required),
      litrosLimite: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
      folioInicial: new FormControl('', Validators.required),
      folioFinal: new FormControl('', Validators.required),
      km: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required)
    });
  }

  guardar(): void {
    this.cargadorService.activar();
    let tarjetaElectronica: any = {
      numeroConvenio: this.form.get("numeroConvenio")?.value,
      nombreEmpresa: this.form.get("nombreEmpresa")?.value,
      importeMensual: this.form.get("importeMensual")?.value,
      fechaInicioConvenio: this.datePipe.transform(this.form.get("fechaInicioConvenio")?.value, 'YYYY-MM-dd'),
      fechaFinConvenio: this.datePipe.transform(this.form.get("fechaFinConvenio")?.value, 'YYYY-MM-dd'),
      litrosLimite: this.form.get("litrosLimite")?.value,
      ooad: this.form.get("ooad")?.value,
      folioInicial: this.form.get("folioInicial")?.value,
      folioFinal: this.form.get("folioFinal")?.value,
      km: this.form.get("km")?.value,
      estatus: this.form.get("estatus")?.value,
      matricula: "0123456789" //Matricula del Usuario Logueado
    };
    this.tarjetaElectronicaService.guardar(tarjetaElectronica).subscribe(
      (respuesta) => {
        this.alertaService.mostrar("exito", this.ALTA_TARJETA);
        this.cargadorService.desactivar();
        this.router.navigate(["../"], { relativeTo: this.route });
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
