import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-vehiculo-arrendado',
  templateUrl: './alta-vehiculo-arrendado.component.html',
  styleUrls: ['./alta-vehiculo-arrendado.component.scss']
})
export class AltaVehiculoArrendadoComponent implements OnInit {

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
      ecco: new FormControl(null, Validators.required),
      noTarjeton: new FormControl(null, Validators.required),
      idTipoVehiculo: new FormControl(null, Validators.required),
      modelo: new FormControl(null, Validators.required),
      idClasifConuee: new FormControl(null, Validators.required),
      idTipoServicio: new FormControl(null, Validators.required),
      submarca: new FormControl(null, Validators.required),
      idCilindro: new FormControl(null, Validators.required),
      idCombustible: new FormControl(null, Validators.required),
      idCantCombustiblePorLitro: new FormControl(null, Validators.required),
      capacidadPersonas: new FormControl(null, Validators.required),
      idCapToneladas: new FormControl(null, Validators.required),
      placas: new FormControl(null, Validators.required),
      licCofepris: new FormControl(null, Validators.required),
      vencLicCofepris: new FormControl(null, Validators.required),
      idTipoRegimen: new FormControl(null, Validators.required),
      idUnidad: new FormControl(null, Validators.required),
      codigoPostal: new FormControl({ value: null, disabled: true }, Validators.required),
      entidad: new FormControl({ value: null, disabled: true }, Validators.required),
      municipio: new FormControl({ value: null, disabled: true }, Validators.required),
      colonia: new FormControl({ value: null, disabled: true }, Validators.required),
      nombreArrendadora: new FormControl(null, Validators.required),
      idNoContrato: new FormControl(null, Validators.required),
      fechaInicioContrato: new FormControl(null, Validators.required),
      fechaFinContrato: new FormControl(null, Validators.required),
      costoDiario: new FormControl(null, Validators.required),
      costoMensual: new FormControl(null, Validators.required),
      idEstatus: new FormControl(null, Validators.required),
      nombreAseguradora: new FormControl(null, Validators.required),
      poliza: new FormControl(null, Validators.required),
      auxiliarContable: new FormControl(null, Validators.required),
      vehiculoSustituto: new FormControl(null, Validators.required),
    });
  }

  guardar() {

  }

  get f() {
    return this.form.controls;
  }

}
