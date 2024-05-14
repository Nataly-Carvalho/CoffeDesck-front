import { Chamados } from "./Chamados";

export class Tecnico{
    public id: number;
    public nome: string;
    public email: string;
    public senha:string;
    public role: string

    public chamados: Chamados[]
}