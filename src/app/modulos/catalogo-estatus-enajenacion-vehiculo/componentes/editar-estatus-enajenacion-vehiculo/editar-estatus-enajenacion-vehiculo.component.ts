import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';

@Component({
  selector: 'app-editar-estatus-enajenacion-vehiculo',
  templateUrl: './editar-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./editar-estatus-enajenacion-vehiculo.component.scss'],
})
export class EditarEstatusEnajenacionVehiculoComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    private vehiculosService: VehiculoEnajenacionService,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      idEstatusEnajenacion: new FormControl('', Validators.required),
      desEstatusEnajenacion: new FormControl('', Validators.required),
    });
  }
  form;
  respuesta!: HttpRespuesta<any> | null;
  estatus: any;
  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    console.log(respuesta);
    this.estatus = respuesta.datos;
    this.form.controls['idEstatusEnajenacion'].setValue(this.estatus.idEstatusEnajenacion);
    this.form.controls['desEstatusEnajenacion'].setValue(
      this.estatus.desEstatusEnajenacion
    );
    this.form.controls['idEstatusEnajenacion'].disable();
  }

  cancelar() {}

  guardar() {
    this.vehiculosService
      .update(
        this.estatus.idEstatusEnajenacion,
        this.form.controls['desEstatusEnajenacion'].value
      )
      .subscribe((response) => {
        this.route.navigate(["../../"], { relativeTo: this.router });
      });
  }
}
