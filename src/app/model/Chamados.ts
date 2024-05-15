import { Prioridade } from "./Prioridade"
import { Setor } from "./Setor"
import { Status } from "./Status"
import { Tecnico } from "./Tecnico"
import { User } from "./User"


export class Chamados{
    public id: string
    public titulo:string
    public descricao:string
    public dataInicio: Date
    public dataTermino:Date
    public prioridade: Prioridade
    public usuario : User
    public setor: Setor
    public tecnico: Tecnico
    public status: Status


}