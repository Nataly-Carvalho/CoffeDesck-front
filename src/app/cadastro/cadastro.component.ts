import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  user: User = new User
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
    if (this.user.senha !== this.confirmarSenha) {
      Swal.fire({
        title: 'Erro',
        text: 'As senhas estão diferentes',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    }
  }
}
