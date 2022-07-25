import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { CargadorService } from 'src/app/compartidos/cargador/cargador.service';
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
  form!: FormGroup;
  validarCampos: boolean = false;
  ooads: Array<any> = [];
  roles: Array<any> = [];
  unidades: Array<any> = [];
  motivos: any[] = [];
  estatus: any = [
    { id: 1, label: 'Baja' },
    { id: 2, label: 'Cambio de adscripción' },
    { id: 3, label: 'Bloqueado' }
  ];
  catMotivos: any = [
    { id: 1, label: 'Defunción', idEstatus: 'Baja' },
    { id: 2, label: 'Jubilación', idEstatus: 'Baja'},
    { id: 3, label: 'Renuncia', idEstatus: 'Baja' },
    { id: 4, label: 'Contratación 08', idEstatus: 'Bloqueado' },
    { id: 5, label: 'Por intentos fallidos', idEstatus: 'Bloqueado' },
    { id: 6, label: 'Por incapacidad', idEstatus: 'Bloqueado' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private usuarioSitService: UsuarioService,
    private unidadService: UsuarioSitUnidadService,
    private alertService: AlertasFlotantesService,
    private matriculaService: MatriculaService,
    private cargadorService: CargadorService
  ) { }

  ngOnInit(): void {
    const respuesta = this.router.snapshot.data['respuesta'];
    this.ooads = respuesta[1].data;
    this.roles = respuesta[0].data;
    this.inicializarForm();
  }

  inicializarForm() {
    this.form = this.formBuilder.group({
      matricula: new FormControl(null, Validators.required),
      nombreUsuario: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      ooad: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      idRol: new FormControl('', Validators.required),
      estatusUsuario: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      matriculaAudita: new FormControl(''),
      indSistema: new FormControl(true),
      password: new FormControl('', Validators.required),
    });
  }

  consultarMotivos(idEstatus: string) {
    this.motivos = this.catMotivos.filter((m: any) => m.idEstatus === idEstatus);
  }

  onChangeOoad() {
    const ooad = this.form.controls['ooad'].value;
    this.unidadService.consultarPorOoad(ooad).subscribe((response) => {
      this.unidades = response!.datos;
    });
  }

  async guardar() {
    this.cargadorService.activar();
    try {
      if (await this.validarEstatusSIAP()) {
        let usuarioAutenticado: any = JSON.parse(localStorage.getItem(TRANSPORTES_USUARIO) as string);
        this.form.get('matriculaAudita')?.setValue(usuarioAutenticado?.matricula);
        if (this.form.valid) {
          const datos = this.form.getRawValue();
          this.usuarioSitService.guardar(datos).subscribe((response) => {
            this.cargadorService.desactivar();
            this.alertService.mostrar("exito", this.ALTA_USUARIO);
            this.route.navigate(["../"], { relativeTo: this.router });
          }),
            (error: HttpErrorResponse) => {
              console.error("ERROR: ", error);
              this.cargadorService.desactivar();
            }
        } else {
          this.cargadorService.desactivar();
          this.validarCampos = true;
          this.onFormUpdate();
        }
      } else {
        this.cargadorService.desactivar();
        this.alertService.mostrar("error", this.ESTATUS_BAJA_SIAP_USUARIO)
      }
    } catch (error) {
      console.error("CATCH ERROR: ", error);
      this.cargadorService.desactivar();
    }
  }

  async validarEstatusSIAP(): Promise<boolean> {
    let respuesta = await this.matriculaService.consultarMatriculaSIAP(this.form.get('matricula')?.value).pipe(first()).toPromise();
    if (respuesta.datos) {
      return respuesta.datos.status === 1;
    } else {
      return false;
    }
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
