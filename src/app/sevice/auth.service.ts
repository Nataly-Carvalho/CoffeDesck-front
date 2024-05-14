import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
import { environment } from 'src/environments/environment.prod';
import { Tecnico } from '../model/Tecnico';
import { Admin } from '../model/Admin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

//Cliente-------------------------------------------------------------------
  cadastrar(user:User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/usuarios/cadastrar', user)
  }
  entrarCliente(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin)
  }
  getByIdUser(id:number):Observable<User>{
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`)
  }

  //Cliente-------------------------------------------------------------------
  //Tecnico-------------------------------------------------------------------
  cadastrarTecnico(user:Tecnico): Observable<Tecnico>{
    return this.http.post<Tecnico>('http://localhost:8080/tecnicos', user)
  }
  entrartecnico(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http://localhost:8080/tecnicos/logar', userLogin)
  }
  getByIdTecnico(id:number):Observable<Tecnico>{
    return this.http.get<Tecnico>(`http://localhost:8080/tecnicos/${id}`)
  }

//Tecnico---------------------------------------------------------------------
//admin---------------------------------------------------------------------
 entrarAdmin(userLogin: UserLogin): Observable<UserLogin>{
  return this.http.post<UserLogin>('http://localhost:8080/admins/logar', userLogin)
}
cadastrarAdmin(user:Admin): Observable<Admin>{
  return this.http.post<Admin>('http://localhost:8080/admins/cadastrar', user)
}
//admin---------------------------------------------------------------------
  logado(){
    let ok: boolean = false
    
    if (environment.token != ''){
      ok = true
    }
    return ok
  }
}
