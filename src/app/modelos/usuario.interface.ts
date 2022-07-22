import { OpcionMenu } from "./opcion-menu.interface";

export interface Usuario {
    nombreUsuario: string;
    matricula: string;
    ooad: string;
    rol: string;

    menu: OpcionMenu[];
}