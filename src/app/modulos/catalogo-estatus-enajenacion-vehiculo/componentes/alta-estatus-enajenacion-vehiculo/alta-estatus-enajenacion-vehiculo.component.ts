import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';

@Component({
  selector: 'app-alta-estatus-enajenacion-vehiculo',
  templateUrl: './alta-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./alta-estatus-enajenacion-vehiculo.component.scss'],
})
export class AltaEstatusEnajenacionVehiculoComponent implements OnInit {
  form;
  readonly MENSAJE_EXITO =
    'El estatus de enajenación ha sido dado de alta exitosamente';
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private estatusService: VehiculoEnajenacionService,
    private alertService: AlertasFlotantesService
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
        this.alertService.mostrar('exito', this.MENSAJE_EXITO);
         this.route.navigate(["../"], { relativeTo: this.router });
      });
    }
  }
  get f() {
    return this.form.controls;
  }
}
