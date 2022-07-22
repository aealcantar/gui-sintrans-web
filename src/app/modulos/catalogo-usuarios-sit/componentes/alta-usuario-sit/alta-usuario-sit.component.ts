import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { TRANSPORTES_USUARIO } from 'src/app/servicios/seguridad/autenticacion.service';
import { UsuarioSitUnidadService } from '../../service/usuario-sit-unidad.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-alta-usuario-sit',
  templateUrl: './alta-usuario-sit.component.html',
  styleUrls: ['./alta-usuario-sit.component.scss'],
})
export class AltaUsuarioSitComponent implements OnInit {
  
  readonly ALTA_USUARIO = "El usuario ha sido de alta exitosamente.";
  form;
  ooads: Array<any> = [];
  roles: Array<any> = [];
  unidades: Array<any> = [];
  estatus: any = [
    { id: 1, label: 'Baja' },
    { id: 2, label: 'Cambio de adscripción' },
    { id: 3, label: 'Bloqueado' },
  ];
  motivos: any = [
    { id: 1, label: 'Defunción' },
    { id: 2, label: 'Jubilación' },
    { id: 3, label: 'Renuncia' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route : Router,
    private usuarioSitService: UsuarioService,
    private unidadService: UsuarioSitUnidadService,
    private alertService : AlertasFlotantesService
  ) {
    this.form = formBuilder.group({
      matricula: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      ooad: new FormControl(''),
      unidad: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      estatusUsuario: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      matriculaAudita: new FormControl('555555', Validators.required),
      indSistema: new FormControl(true, Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    this.ooads = respuesta[1].data;
    this.roles = respuesta[0].data;
  }
  onChangeOoad() {
    const ooad = this.form.controls['ooad'].value;
    this.unidadService.consultarPorOoad(ooad).subscribe((response) => {
      this.unidades = response!.data;
    });
  }
  guardar() {
    let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
    this.form.get('matriculaAudita')?.setValue(usuarioAutenticado.matricula);
    if (this.form.valid) {
      const datos = this.form.getRawValue();
      this.usuarioSitService.guardar(datos).subscribe((response) => {
        console.log(response);
        this.alertService.mostrar("exito",this.ALTA_USUARIO)
        this.route.navigate(["../"], { relativeTo: this.router });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

}
