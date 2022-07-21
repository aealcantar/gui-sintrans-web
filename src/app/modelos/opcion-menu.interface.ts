
export interface OpcionMenu {
    etiqueta: string;
    icono: string;
    ruta: string;
    columna1: OpcionColumna[];
    columna2: OpcionColumna[];
    columna3: OpcionColumna[];
    columna4: OpcionColumna[];
}

export interface OpcionColumna {
    etiqueta: string;
    esTitulo: number | boolean;
    ruta: string;
}
