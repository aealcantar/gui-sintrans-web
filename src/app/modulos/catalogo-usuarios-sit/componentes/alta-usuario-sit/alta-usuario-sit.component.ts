import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { AlertasFlotantesService } from 'src/app/servicios/alertas-flotantes.service';
import { MatriculaService } from 'src/app/servicios/matricula.service';
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
  readonly ESTATUS_BAJA_SIAP_USUARIO = "La matrícula del usuario no se encuentra activa.";
  form;
  validarCampos: boolean = false;
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
    private route: Router,
    private usuarioSitService: UsuarioService,
    private unidadService: UsuarioSitUnidadService,
    private alertService: AlertasFlotantesService,
    private matriculaService: MatriculaService
  ) {
    this.form = formBuilder.group({
      matricula: new FormControl('', Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      estatusUsuario: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      matriculaAudita: new FormControl('55555', Validators.required),
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

  async guardar() {
    if (await this.validarEstatusSIAP()) {
      let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
      this.form.get('matriculaAudita')?.setValue(usuarioAutenticado?.matricula);
      if (this.form.valid) {
        const datos = this.form.getRawValue();
        this.usuarioSitService.guardar(datos).subscribe((response) => {
          console.log(response);
          this.alertService.mostrar("exito", this.ALTA_USUARIO);
          this.route.navigate(["../"], { relativeTo: this.router });
        });
      } else {
        this.validarCampos = true;
        this.onFormUpdate();
      }
    } else {
      this.form.reset();
      this.alertService.mostrar("error", this.ESTATUS_BAJA_SIAP_USUARIO)
    }
  }

  async validarEstatusSIAP(): Promise<boolean> {
    let respuesta = await this.matriculaService.consultarMatriculaSIAP(this.form.get('matricula')?.value).pipe(first()).toPromise();
    let informacionSIAP = respuesta.datos;
    return informacionSIAP.status === 1;
  }

  onFormUpdate() {
    this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        this.validarCampos = false
      }
    })
  }

  get f() {
    return this.form.controls;
  }

}
