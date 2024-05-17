import {Chamados} from "./Chamados";
export class User{
    public id: number;
    public nome: string;
    public email: string;
    public senha:string;
    public role : string

    public chamados: Chamados[]
}