import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.usuario.role = "USER";
    this.authService.updateCliente(this.usuario.id, this.usuario).subscribe(
      (resp: any) => {
        this.getallUsers(); // Supondo que você tenha um método para obter todos os usuários
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário editado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Erro ao editar usuário:', error);
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao editar o usuário. Por favor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
