import { Chamados } from "./Chamados";

export class Admin{
    public id: number;
    public nome: string;
    public email: string;
    public senha:string;
    public role: string
    public chamados: Chamados[]
}