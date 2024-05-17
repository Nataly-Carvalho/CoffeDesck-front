import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { Tecnico } from '../model/Tecnico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-tecnico',
  templateUrl: './cadastro-tecnico.component.html',
  styleUrls: ['./cadastro-tecnico.component.css']
})
export class CadastroTecnicoComponent implements OnInit {
  user: Tecnico = new Tecnico
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }
  cadastrar() {
    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'As senhas estão diferentes',
        confirmButtonText: 'OK'
      });
    } else {
      this.authService.cadastrarTecnico(this.user).subscribe(
        (resp: Tecnico) => {
          this.user = resp;
          this.router.navigate(['/login']);
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Técnico cadastrado com sucesso!',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Erro ao cadastrar Técnico:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao cadastrar o técnico. Por favor, tente novamente mais tarde.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

}
