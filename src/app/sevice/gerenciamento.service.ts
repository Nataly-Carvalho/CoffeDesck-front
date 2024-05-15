import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


import { Setor } from '../model/Setor';
import { Prioridade } from '../model/Prioridade';

@Injectable({
    providedIn: 'root'
})
export class GerenciamentoService {

    constructor(private http: HttpClient) { }

    private baseUrl = 'http://localhost:8080/gerenciamento';

    token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
    }

    getAllSetores():Observable<Setor[]>{
        return this.http.get<Setor[]>('http://localhost:8080/gerenciamento/todossetores',this.token)
    }

    getByIdSetor(id:number):Observable<Setor>{
        return this.http.get<Setor>(`http://localhost:8080/gerenciamento/setor/${id}`, this.token)
    }

    

    getAllPrioridade():Observable<Prioridade[]>{
        return this.http.get<Prioridade[]>('http://localhost:8080/gerenciamento/allprioridade', this.token)
    }
    getByIdPrioridade(id:number):Observable<Prioridade>{
        return this.http.get<Prioridade>(`http://localhost:8080/gerenciamento/prioridade/${id}`, this.token)
    }

}




