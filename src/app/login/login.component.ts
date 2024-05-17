import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();
  errorMessage: string = '';


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }


  private handleLoginResponse(resp: UserLogin, role: string) {
    this.userLogin = resp;

    environment.token = this.userLogin.token;
    environment.nome = this.userLogin.nome;
    environment.id = this.userLogin.id;
    environment.role = this.userLogin.role;

    console.log(environment.token);
    console.log(environment.nome);
    console.log(environment.id);
    console.log(environment.role);

    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'TECHNICIAN') {
      this.router.navigate(['/tecnico']);
    } else if (role === 'USER') {
      this.router.navigate(['/cliente']);
    }
  }

  entrarAdmin() {
    this.auth.entrarAdmin(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.handleLoginResponse(resp, 'ADMIN');
      },
      error => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode entrar aqui',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode acessar essa rota! disponivel apenas para administradores',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  entrarTecnico() {
    this.auth.entrartecnico(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.handleLoginResponse(resp, 'TECHNICIAN');
      },
      error => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode entrar aqui',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode acessar essa rota! disponivel apenas para Tecnicos',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  entrarCliente() {
    this.auth.entrarCliente(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.handleLoginResponse(resp, 'USER');
      },
      error => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode entrar aqui',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            title: 'Erro',
            text: 'Você não pode acessar essa rota! disponivel apenas para clientes',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }

  entrar() {
    if (this.userLogin.role === 'ADMIN') {
      this.entrarAdmin();
    } else if (this.userLogin.role === 'TECHNICIAN') {
      this.entrarTecnico();
    } else if (this.userLogin.role === 'USER') {
      this.entrarCliente();
    }
  }
}