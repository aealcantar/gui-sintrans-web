import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng-lts/overlaypanel';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  @ViewChild(OverlayPanel)
  overlayPanel!: OverlayPanel;

  mostrarOverlayUsuario:boolean = false;

  // @Output()
  // rutaElementoSeleccionado: EventEmitter<string> = new EventEmitter<string>()

  columna1: any[] = [];
  columna2: any[] = [];
  columna3: any[] = [];
  columna4: any[] = [];

  opcionSeleccionada = null;

  elementos: any = [
    {
      etiqueta: 'Inicio',
      icono: 'icono-home',
      ruta: 'inicio'
    },
    {
      etiqueta: 'Administración',
      icono: 'icono-administracion',
      ruta:'',
      columna1: [],
      columna2: [
        {
          etiqueta: 'Catálogo de unidades',
          esTitulo: false,
          ruta: 'catalogo-de-unidades',
        },
        {
          etiqueta: 'Catálogo de usuarios SIT',
          esTitulo: false,
          ruta: 'catalogo-de-usuarios-sit',
        },
        {
          etiqueta: 'Catálogo de estatus de enajenación de vehículo',
          esTitulo: false,
          ruta: 'catalogo-de-estatus-de-enajenacion-de-vehiculo',
        },
        {
          etiqueta: 'Catálogo de tarjetas electrónicas de combustible',
          esTitulo: false,
          ruta: 'catalogo-de-tarjetas-electronicas-de-combustible',
        }
      ],
      columna3: [],
      columna4: []
    },
    {
      etiqueta: 'Captura',
      icono: 'icono-captura',
      ruta:'',
      columna1: [],
      columna2: [
        {
          etiqueta: 'Vehículos propios',
          esTitulo: false,
          ruta: 'vehiculos-propios',
        },
        {
          etiqueta: 'Vehículos arrendados',
          esTitulo: false,
          ruta: 'vehiculos-arrendados',
        },
        {
          etiqueta: 'Choferes',
          esTitulo: false,
          ruta: 'choferes',
        },
        {
          etiqueta: 'Aseguradoras',
          esTitulo: false,
          ruta: 'aseguradoras',
        },
        {
          etiqueta: 'Arrendatarios',
          esTitulo: false,
          ruta: 'arrendatarios',
        }
      ],
      columna3: [
        {
          etiqueta: 'Préstamo',
          esTitulo: false,
          ruta: 'prestamo',
        },
        {
          etiqueta: 'Resguardo de vehículos',
          esTitulo: false,
          ruta: 'resguardo-de-vehiculos',
        },
        {
          etiqueta: 'Kilometraje por vehículo',
          esTitulo: false,
          ruta: 'kilometraje-por-vehiculo',
        },
        {
          etiqueta: 'Combustible',
          esTitulo: false,
          ruta: 'combustible',
        },
        {
          etiqueta: 'Mantenimiento y taller de vehículos',
          esTitulo: false,
          ruta: 'mantenimiento-y-taller-de-vehículos',
        }
      ],
      columna4: []
    },
    {
      etiqueta: 'Rutas y asignaciones',
      icono: 'icono-rutas-asignaciones',
      ruta:'',
      columna1: [],
      columna2: [],
      columna3: [
        {
          etiqueta: 'Rutas',
          esTitulo: false,
          ruta: 'rutas',
        },
        {
          etiqueta: 'Asignaciones',
          esTitulo: false,
          ruta: 'asignaciones',
        },
        {
          etiqueta: 'Control de rutas y asignaciones',
          esTitulo: false,
          ruta: 'control-de-rutas-y-asignaciones',
        },
        {
          etiqueta: 'Reasignación de rutas',
          esTitulo: false,
          ruta: 'reasignacion-de-rutas',
        }
      ],
      columna4: []
    },
    {
      etiqueta: 'Reportes y formatos',
      icono: 'icono-reportes-formatos',
      ruta:'',
      columna1: [
        {
          etiqueta: 'Reportes de ocasión',
          esTitulo: true
        },
        {
          etiqueta: 'Inventarios de autos propios',
          esTitulo: false,
          ruta: 'inventarios-de-autos-propios',
        },
        {
          etiqueta: 'Inventario de autos de arrendamiento',
          esTitulo: false,
          ruta: 'inventario-de-autos-de-arrendamiento',
        },
        {
          etiqueta: 'Inventario de choferes',
          esTitulo: false,
          ruta: 'inventario-de-choferes',
        },
      ],
      columna2: [
        {
          etiqueta: 'Reportes de diarios',
          esTitulo: true
        },
        {
          etiqueta: 'Captura de resguardo de ambulancia por turno',
          esTitulo: false,
          ruta: 'captura-de-resguardo-de-ambulancia-por-turno',
        },
        {
          etiqueta: 'Control de rutas y asignaciones',
          esTitulo: false,
          ruta: 'control-de-rutas-y-asignaciones',
        },
        {
          etiqueta: 'Rutas diarias',
          esTitulo: false,
          ruta: 'rutas-diarias',
        },
      ],
      columna3: [
        {
          etiqueta: 'Reportes mensuales',
          esTitulo: true
        },
        {
          etiqueta: 'Resumen de propios y arrendados',
          esTitulo: false,
          ruta: 'resumen-de-propios-y-arrendados',
        },
        {
          etiqueta: 'Préstamo y pernoctas de vehículos',
          esTitulo: false,
          ruta: 'prestamo-y-pernoctas-de-vehiculos',
        },
        {
          etiqueta: 'Carga de combustible',
          esTitulo: false,
          ruta: 'carga-de-combustible',
        },
        {
          etiqueta: 'Mantenimiento',
          esTitulo: false,
          ruta: 'mantenimiento',
        },
        {
          etiqueta: 'Siniestro',
          esTitulo: false,
          ruta: 'siniestro',
        }
      ],
      columna4: [
        {
          etiqueta: 'Reportes mensuales CONUEE',
          esTitulo: true
        },
        {
          etiqueta: 'Captura reporte CONUEE',
          esTitulo: false,
          ruta: 'captura-reporte-conuee',
        },
        {
          etiqueta: 'Revisión y modificación reporte CONUEE',
          esTitulo: false,
          ruta: 'revision-y-modificacion-reporte-conuee',
        },
        {
          etiqueta: 'Servicios de transporte terrestre consumo de combustible litros',
          esTitulo: false,
          ruta: 'servicios-de-transporte-terrestre-consumo-de-combustible-litros',
        },
        {
          etiqueta: 'Servicio de transporte terrestre distancia recorrida-KM',
          esTitulo: false,
          ruta: 'servicio-de-transporte-terrestre-distancia-recorrida-KM',
        },
        {
          etiqueta: 'Importe facturación de combustible',
          esTitulo: false,
          ruta: 'importe-facturacion-de-combustible',
        },
        {
          etiqueta: 'Servicios de transporte terrestre CONUEE',
          esTitulo: false,
          ruta: 'servicios-de-transporte-terrestre-conuee',
        }
      ]
    },
    {
      etiqueta: 'Reportes y estadísticas',
      icono: 'icono-reportes-formatos',
      ruta:'',
      columna1: [
        {
          etiqueta: 'Captura general',
          esTitulo: true
        },
        {
          etiqueta: 'Módulos de ambulancia',
          esTitulo: false,
          ruta: 'modulos-de-ambulancia',
        },
        {
          etiqueta: 'Personal de ambulancia',
          esTitulo: false,
          ruta: 'personal-de-ambulancia',
        },
        {
          etiqueta: 'Incidencias de personal de ambulancia',
          esTitulo: false,
          ruta: 'incidencias-de-personal-de-ambulancia',
        },
        {
          etiqueta: 'Armado de tripulación de ambulancia',
          esTitulo: false,
          ruta: 'armado-de-tripulacion-de-ambulancia',
        },
        {
          etiqueta: 'Recepción de la solicitud de traslado de pacientes',
          esTitulo: false,
          ruta: 'recepcion-de-la-solicitud-de-traslado-de-pacientes',
        },
        {
          etiqueta: 'Censo de pacientes',
          esTitulo: false,
          ruta: 'censo-de-pacientes',
        },
        {
          etiqueta: 'Resguardo de ambulancia por turno',
          esTitulo: false,
          ruta: 'resguardo-de-ambulancia-por-turno',
        }
      ],
      columna2: [
        {
          etiqueta: 'Rutas y asignaciones',
          esTitulo: true
        },
        {
          etiqueta: 'Asignación de rutas',
          esTitulo: false,
          ruta: 'asignacion-de-rutas',
        },
        {
          etiqueta: 'Asignación de rutas foráneas',
          esTitulo: false,
          ruta: 'asignacion-de-rutas-foraneas',
        },
        {
          etiqueta: 'Control de rutas y asignaciones',
          esTitulo: false,
          ruta: 'control-de-rutas-y-asignaciones',
        },
        {
          etiqueta: 'Reasignación de rutas',
          esTitulo: false,
          ruta: 'reasignacion-de-rutas',
        }
      ],
      columna3: [
        {
          etiqueta: 'Reportes y estadísticas',
          esTitulo: true
        },
        {
          etiqueta: 'Asignación de rutas Centracom',
          esTitulo: false,
          ruta: 'asignacion-de-rutas-centracom',
        },
        {
          etiqueta: 'Incidencias de personal de ambulancias',
          esTitulo: false,
          ruta: 'incidencias-de-personal-de-ambulancias',
        },
        {
          etiqueta: 'Solicitud de traslados mensuales',
          esTitulo: false,
          ruta: 'solicitud-de-traslados-mensuales',
        },
        {
          etiqueta: 'Servicios solicitados y cancelador por turno',
          esTitulo: false,
          ruta: 'servicios-solicitados-y-cancelador-por-turno',
        },
        {
          etiqueta: 'Porcentaje de servicios atendidos por módulos',
          esTitulo: false,
          ruta: 'porcentaje-de-servicios-atendidos-por-módulos',
        },
        {
          etiqueta: 'Cantidad y porcentaje por servicio brindado',
          esTitulo: false,
          ruta: 'cantidad-y-porcentaje-por-servicio-brindado',
        },
        {
          etiqueta: 'Comparativo entre meses',
          esTitulo: false,
          ruta: 'comparativo-entre-meses'
        }
      ],
      columna4: [

      ]
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  abrirOverlay(event: any, elemento: any) {
    this.opcionSeleccionada = elemento;
    this.columna1 = elemento.columna1;
    this.columna2 = elemento.columna2;
    this.columna3 = elemento.columna3;
    this.columna4 = elemento.columna4;
    this.overlayPanel.toggle(event);
  }

  navegar(ruta: string) {
    this.overlayPanel.hide();
    this.router.navigate([ruta]);
  }

}
