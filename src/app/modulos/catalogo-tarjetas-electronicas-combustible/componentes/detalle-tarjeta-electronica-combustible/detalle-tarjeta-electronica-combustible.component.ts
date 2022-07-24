import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { Ooad } from 'src/app/modelos/ooad.interface';
import { TarjetaElectronica } from 'src/app/modelos/tarjeta-electronica.interface';

@Component({
  selector: 'app-detalle-tarjeta-electronica-combustible',
  templateUrl: './detalle-tarjeta-electronica-combustible.component.html',
  styleUrls: ['./detalle-tarjeta-electronica-combustible.component.scss'],
  providers: [DatePipe]
})
export class DetalleTarjetaElectronicaCombustibleComponent implements OnInit {

  readonly POSICION_TARJETA_ELECTRONICA = 0;
  readonly POSICION_CATALOGO_OOAD = 1;
  readonly POSICION_CATALOGO_ESTATUS = 2;
  respuesta!: HttpRespuesta<any> | null;
  idTarjetaElectronica: any;
  catOoad: Ooad[] = [];
  catEstatus: any[] = [];

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let respuesta = this.route.snapshot.data["respuesta"];
    let tarjetaElectronica: any = respuesta[this.POSICION_TARJETA_ELECTRONICA].datos;
    this.idTarjetaElectronica = tarjetaElectronica.idTarjetaElectronica;
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

  inicializarForm(tarjetaElectronica: TarjetaElectronica): void {
    this.form = this.formBuilder.group({
      idTarjetaElectronica: new FormControl({ value: tarjetaElectronica.idTarjetaElectronica, disabled: true}),
      numeroConvenio: new FormControl({ value: tarjetaElectronica.cveNumeroConvenio, disabled: true}),
      nombreEmpresa: new FormControl({ value: tarjetaElectronica.nomEmpresa, disabled: true}),
      importeMensual: new FormControl({ value: tarjetaElectronica.impMensual, disabled: true}),
      fechaInicioConvenio: new FormControl({ value: this.datePipe.transform(tarjetaElectronica.fecIniConvenio, 'dd/MM/YYYY'), disabled: true}),
      fechaFinConvenio: new FormControl({ value: this.datePipe.transform(tarjetaElectronica.fecFinConvenio, 'dd/MM/YYYY'), disabled: true}),
      litrosLimite: new FormControl({ value: tarjetaElectronica.canLitrosLimiteMes, disabled: true}),
      ooad: new FormControl({ value: tarjetaElectronica.idOoad, disabled: true}),
      folioInicial: new FormControl({ value: tarjetaElectronica.numFolioInicial, disabled: true}),
      folioFinal: new FormControl({ value: tarjetaElectronica.numFolioFinal, disabled: true}),
      km: new FormControl({ value: tarjetaElectronica.canKmsRecorridos, disabled: true}),
      estatus: new FormControl({ value: tarjetaElectronica.desEstatusTarjeta, disabled: true})
    });
  }

}
