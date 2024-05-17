import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { Tecnico } from '../model/Tecnico';

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
      alert('As senhas estão diferentes')

    } else {
      this.authService.cadastrarTecnico(this.user).subscribe((resp: Tecnico) => {
        this.user = resp
        this.router.navigate(['/login'])
        alert('Tecnico Cadastrado com sucesso!')
      })

    }
  }

}
