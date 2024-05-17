import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent implements OnInit {

  usuario: User = new User()
  listaUsuario: User[]

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string
  idUser: number


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    if (environment.token == '') {
      //alert('Sua seção expirou, faça login novamente!')
      this.router.navigate(['/inicio'])
    }
    this.getallUsers()

  }
  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.usuario = resp
    })
  }

  getallUsers() {
    this.authService.getAllUser().subscribe((resp: User[]) => {
      this.listaUsuario = resp
    })
  }
  selecionarUsuario(usuarioSelecionado: User) {
    this.usuario = { ...usuarioSelecionado };
    console.log('Usuário selecionado:', this.usuario);
  }

  editarUsuario() {

    this.user.role = "USER"
    this.user.nome = this.usuario.nome
    this.user.senha = this.usuario.senha
    this.user.email = this.usuario.email

    this.authService.updateCliente(this.usuario.id, this.user).subscribe((resp: any) => {
      this.getallUsers();
      console.log('Usuário editado com sucesso', resp);
    }, error => {
      console.error('Erro ao editar usuário', error);
    });


  }
}
