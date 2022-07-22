import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-vehiculo-arrendado',
  templateUrl: './detalle-vehiculo-arrendado.component.html',
  styleUrls: ['./detalle-vehiculo-arrendado.component.scss']
})
export class DetalleVehiculoArrendadoComponent implements OnInit {
  form!: FormGroup;

  ooad: any = [
    {
      label: 'Valor 1', value: 1
    },
    {
      label: 'Valor 2', value: 2
    },
    {
      label: 'Valor 3', value: 3
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      ecco: new FormControl({ value: null, disabled: true }, Validators.required),
      noTarjeton: new FormControl({ value: null, disabled: true }, Validators.required),
      idTipoVehiculo: new FormControl({ value: null, disabled: true }, Validators.required),
      modelo: new FormControl({ value: null, disabled: true }, Validators.required),
      idClasifConuee: new FormControl({ value: null, disabled: true }, Validators.required),
      idTipoServicio: new FormControl({ value: null, disabled: true }, Validators.required),
      submarca: new FormControl({ value: null, disabled: true }, Validators.required),
      idCilindro: new FormControl({ value: null, disabled: true }, Validators.required),
      idCombustible: new FormControl({ value: null, disabled: true }, Validators.required),
      idCantCombustiblePorLitro: new FormControl({ value: null, disabled: true }, Validators.required),
      capacidadPersonas: new FormControl({ value: null, disabled: true }, Validators.required),
      idCapToneladas: new FormControl({ value: null, disabled: true }, Validators.required),
      placas: new FormControl({ value: null, disabled: true }, Validators.required),
      licCofepris: new FormControl({ value: null, disabled: true }, Validators.required),
      vencLicCofepris: new FormControl({ value: null, disabled: true }, Validators.required),
      idTipoRegimen: new FormControl({ value: null, disabled: true }, Validators.required),
      idUnidad: new FormControl({ value: null, disabled: true }, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required),
      entidad: new FormControl({ value: null, disabled: true }, Validators.required),
      municipio: new FormControl({ value: null, disabled: true }, Validators.required),
      colonia: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreArrendadora: new FormControl({ value: null, disabled: true }, Validators.required),
      idNoContrato: new FormControl({ value: null, disabled: true }, Validators.required),
      fechaInicioContrato: new FormControl({ value: null, disabled: true }, Validators.required),
      fechaFinContrato: new FormControl({ value: null, disabled: true }, Validators.required),
      costoDiario: new FormControl({ value: null, disabled: true }, Validators.required),
      costoMensual: new FormControl({ value: null, disabled: true }, Validators.required),
      idEstatus: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreAseguradora: new FormControl({ value: null, disabled: true }, Validators.required),
      poliza: new FormControl({ value: null, disabled: true }, Validators.required),
      auxiliarContable: new FormControl({ value: null, disabled: true }, Validators.required),
      vehiculoSustituto: new FormControl({ value: null, disabled: true }, Validators.required),
    });
  }


  get f() {
    return this.form.controls;
  }

}
