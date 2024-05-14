import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

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

  entrarAdmin() {
    this.auth.entrarAdmin(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.id = this.userLogin.id;
      environment.role = this.userLogin.role;

      console.log(environment.token);
      console.log(environment.nome);
      console.log(environment.id);
      this.router.navigate(['/admin']);
    }, error => {
      if (error.status == 401) {
        this.errorMessage = 'Usuário ou senha estão incorretos!';
        alert(this.errorMessage);
      } else {
        this.errorMessage = 'Erro ao fazer login. Tente novamente mais tarde.';
        alert(this.errorMessage);
      }
    });
  }

  entrarTecnico() {
    this.auth.entrartecnico(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.id = this.userLogin.id;
      environment.role = this.userLogin.role;

      console.log(environment.token);
      console.log(environment.nome);
      console.log(environment.id);
      this.router.navigate(['/tecnico']);
    }, error => {
      if (error.status == 401) {
        this.errorMessage = 'Usuário ou senha estão incorretos!';
        alert(this.errorMessage);
      } else {
        this.errorMessage = 'Erro ao fazer login. Tente novamente mais tarde.';
        alert(this.errorMessage);
      }
    });
  }

  entrarCliente() {
    this.auth.entrarCliente(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.id = this.userLogin.id;
      environment.role = this.userLogin.role;

      console.log(environment.token);
      console.log(environment.nome);
      console.log(environment.id);
      this.router.navigate(['/cliente']);
    }, error => {
      if (error.status == 401) {
        this.errorMessage = 'Usuário ou senha estão incorretos!';
        alert(this.errorMessage);
      } else {
        this.errorMessage = 'Erro ao fazer login. Tente novamente mais tarde.';
        alert(this.errorMessage);
      }
    });
  }

  entrar() {
    if (this.userLogin.role === 'ADMIN') {
      this.entrarAdmin();
    } else if (this.userLogin.role === 'TECHNICIAN') {
      this.entrarTecnico();
    } else if  (this.userLogin.role === 'USER') {
      this.entrarCliente();
    }
  }
}
