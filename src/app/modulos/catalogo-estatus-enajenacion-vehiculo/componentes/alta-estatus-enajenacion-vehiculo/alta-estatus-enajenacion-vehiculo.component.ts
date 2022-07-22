import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';

@Component({
  selector: 'app-alta-estatus-enajenacion-vehiculo',
  templateUrl: './alta-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./alta-estatus-enajenacion-vehiculo.component.scss'],
})
export class AltaEstatusEnajenacionVehiculoComponent implements OnInit {
  form;
  constructor(
    private fb: FormBuilder,
    private estatusService: VehiculoEnajenacionService
  ) {
    this.form = fb.group({
      desEstatusEnajenacion: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  guardar() {
    if (this.form.valid) {
      const body = this.form.getRawValue();
      this.estatusService.guardar(body).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
