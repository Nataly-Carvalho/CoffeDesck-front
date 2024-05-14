import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod"
import { Chamados } from "../model/Chamados";

@Injectable({
    providedIn: 'root'
})
export class ChamadosService {

    constructor(private http: HttpClient) { }
    private baseUrl = 'http://localhost:8080/chamados';
    token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
    }

    getAllChamados(): Observable<Chamados[]> {
        return this.http.get<Chamados[]>(`http://localhost:8080/chamados`, this.token)
    }

    getByIdChamados(id: string): Observable<Chamados> {
        return this.http.get<Chamados>(`http://localhost:8080/chamados/${id}`, this.token)
    }

    postChamados(chamado: Chamados): Observable<Chamados> {
        return this.http.post<Chamados>(`http://localhost:8080/chamados`, chamado, this.token)
    }
    putChamados(chamado: Chamados): Observable<Chamados> {
        return this.http.put<Chamados>('http://localhost:8080/chamados', chamado, this.token)
    }
    deleteChamado(id: string) {
        return this.http.delete(`http://localhost:8080/chamados/${id}`, this.token)
    }

}
