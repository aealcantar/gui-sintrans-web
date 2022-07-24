export const CATALOGO_TIPO_VEHICULO: any[] = [
    {
        idTipoVehiculo: 1,
        descripcion: "Automóvil"
    },
    {
        idTipoVehiculo: 2,
        descripcion: "SUV"
    },
    {
        idTipoVehiculo: 3,
        descripcion: "Microbús"
    },
    {
        idTipoVehiculo: 4,
        descripcion: "Autobús"
    },
    {
        idTipoVehiculo: 5,
        descripcion: "Van o Vanette"
    },
    {
        idTipoVehiculo: 6,
        descripcion: "Pick-up"
    },
    {
        idTipoVehiculo: 7,
        descripcion: "Camión mediano"
    },
    {
        idTipoVehiculo: 8,
        descripcion: "Tortón y rabón"
    },
    {
        idTipoVehiculo: 9,
        descripcion: "Tractocamión"
    },
    {
        idTipoVehiculo: 10,
        descripcion: "Motocicletas"
    },
    {
        idTipoVehiculo: 11,
        descripcion: "Otros"
    }
];

export const CATALOGO_CONUEE: any[] = [
    {
        idClasificacionCONUEE: 1,
        descripcion: "Servicios generales"
    },
    {
        idClasificacionCONUEE: 2,
        descripcion: "Servidores públicos"
    },
    {
        idClasificacionCONUEE: 3,
        descripcion: "Servidores públicos y operación de programas públicos"
    }
];

export const CATALOGO_TIPO_SERVICIO: any[] = [
    {
        idTipoServicio: 1,
        descripcion: "Apoyo administrativo",
        idClasificacionCONUEE: 1
    },
    {
        idTipoServicio: 2,
        descripcion: "Apoyo administrativo UM",
        idClasificacionCONUEE: 1
    },
    {
        idTipoServicio: 3,
        descripcion: "Estafeta",
        idClasificacionCONUEE: 1
    },
    {
        idTipoServicio: 4,
        descripcion: "Abastecimiento",
        idClasificacionCONUEE: 1
    },
    {
        idTipoServicio: 5,
        descripcion: "Suministro de agua",
        idClasificacionCONUEE: 1
    },
    {
        idTipoServicio: 6,
        descripcion: "Traslado de funcionarios",
        idClasificacionCONUEE: 2
    },
    {
        idTipoServicio: 7,
        descripcion: "Programa ADEC",
        idClasificacionCONUEE: 3
    },
    {
        idTipoServicio: 8,
        descripcion: "Traslado de personal",
        idClasificacionCONUEE: 3
    },
    {
        idTipoServicio: 9,
        descripcion: "Traslado de paciente",
        idClasificacionCONUEE: 3
    },
    {
        idTipoServicio: 10,
        descripcion: "Traslado pacientes terapia intensiva",
        idClasificacionCONUEE: 3
    },
    {
        idTipoServicio: 11,
        descripcion: "Traslado pacientes urgencias",
        idClasificacionCONUEE: 3
    }
];

export const CATALOGO_VERSION: any[] = [
    {
        idVersion: 1,
        descripcion: "Automático"
    },
    {
        idVersion: 2,
        descripcion: "Estándar"
    },
    {
        idVersion: 3,
        descripcion: "Hibrido"
    },
    {
        idVersion: 4,
        descripcion: "4x4"
    },
    {
        idVersion: 5,
        descripcion: "Doble tracción"
    }
];

export const CATALOGO_TIPO_REGIMEN: any[] = [
    {
        idTipoRegimen: 1,
        descripcion: "Bienestar"
    },
    {
        idTipoRegimen: 2,
        descripcion: "Ordinario"
    }
];

export const CATALOGO_COMBUSTIBLE: any[] = [
    {
        idCombustible: 1,
        descripcion: "Gasolina"
    },
    {
        idCombustible: 2,
        descripcion: "Gas"
    },
    {
        idCombustible: 3,
        descripcion: "Diesel"
    },
    {
        idCombustible: 4,
        descripcion: "Híbrido"
    }
];

export const CATALOGO_TONELADA: any[] = [
    {
        idTonelada: 1,
        descripcion: "0.5"
    },
    {
        idTonelada: 2,
        descripcion: "1"
    },
    {
        idTonelada: 3,
        descripcion: "1.5"
    },
    {
        idTonelada: 4,
        descripcion: "2"
    },
    {
        idTonelada: 5,
        descripcion: "2.5"
    },
    {
        idTonelada: 6,
        descripcion: "3"
    },
    {
        idTonelada: 7,
        descripcion: "3.5"
    }
];

export const CATALOGO_CILINDROS: any[] = [
    {
        idCilindro: 1,
        descripcion: "4"
    },
    {
        idCilindro: 2,
        descripcion: "5"
    },
    {
        idCilindro: 3,
        descripcion: "6"
    },
    {
        idCilindro: 4,
        descripcion: "8"
    }
];

export const CATALOGO_ESTATUS: any[] = [
    {
        idEstatus: 1,
        descripcion: "Siniestrado"
    },
    {
        idEstatus: 2,
        descripcion: "Siniestrado en tránsito"
    },
    {
        idEstatus: 3,
        descripcion: "Mantenimiento o descompostura"
    },
    {
        idEstatus: 4,
        descripcion: "En préstamo"
    },
    {
        idEstatus: 5,
        descripcion: "Baja"
    }
];

export const CATALOGO_ESTATUS_CHOFER: any[] = [
    {
        value: 1,
        label: "Baja"
    },
    {
        value: 2,
        label: "Título de la opción"
    },
    {
        value: 3,
        label: "Bloqueado"
    },
    {
        value: 4,
        label: "Título de la opción"
    },
];

export const CATALOGO_ESTATUS_CHOFER_BAJA: any[] = [
    {
        value: 5,
        label: "Defunción"
    },
    {
        value: 6,
        label: "Jubilación"
    },
    {
        value: 7,
        label: "Renuncia"
    },
];

export const CATALOGO_ESTATUS_CHOFER_BLOQUEADO: any[] = [
    {
        value: 8,
        label: "Contratación 08"
    },
    {
        value: 9,
        label: "Por incapacidad"
    },
];