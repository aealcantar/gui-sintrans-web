import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route : Router,
    private router:ActivatedRoute,
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
        this.route.navigate(["../"], { relativeTo: this.router });
      });
    }
  }
}
