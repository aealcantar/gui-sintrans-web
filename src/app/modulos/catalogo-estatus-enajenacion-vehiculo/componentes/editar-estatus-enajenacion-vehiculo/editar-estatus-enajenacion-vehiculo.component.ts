import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRespuesta } from 'src/app/modelos/http-respuesta.interface';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { VehiculoEnajenacionService } from '../../service/vehiculo-enajenacion.service';

@Component({
  selector: 'app-editar-estatus-enajenacion-vehiculo',
  templateUrl: './editar-estatus-enajenacion-vehiculo.component.html',
  styleUrls: ['./editar-estatus-enajenacion-vehiculo.component.scss'],
})
export class EditarEstatusEnajenacionVehiculoComponent implements OnInit {
  readonly MENSAJE = 'El estatus de enajenación ha sido guardado exitosamente.'
  constructor(
    private router: ActivatedRoute,
    private route : Router,
    private vehiculosService: VehiculoEnajenacionService,
    public formBuilder: FormBuilder,
    private alertService : AlertasFlotantesService
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
        this.alertService.mostrar('exito' , this.MENSAJE)
        this.route.navigate(["../../"], { relativeTo: this.router });
      });
  }

  get f() {
    return this.form.controls;
  }
}
