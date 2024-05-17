import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../model/Tecnico';
import { AuthService } from '../sevice/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-ver-tecnicos',
  templateUrl: './ver-tecnicos.component.html',
  styleUrls: ['./ver-tecnicos.component.css']
})
export class VerTecnicosComponent implements OnInit {
  tecnico: Tecnico = new Tecnico()
  listaTecnico: Tecnico[]

  constructor(private authService: AuthService,
    private router: Router,) { }


  ngOnInit(): void {
    window.scroll(0, 0)
    if (environment.token == '') {
      //alert('Sua seção expirou, faça login novamente!')
      this.router.navigate(['/inicio'])
    }
    this.getallTecnico()
  }
  findByIdTecnico(id: number) {
    this.authService.getByIdTecnico(id).subscribe((resp: Tecnico) => {
      this.tecnico = resp
    })
  }

  getallTecnico() {
    this.authService.getAllTecnico().subscribe((resp: Tecnico[]) => {
      this.listaTecnico = resp
    })
  }
  selecionarUsuario(usuarioSelecionado: Tecnico) {
    this.tecnico = { ...usuarioSelecionado };
    console.log('Usuário selecionado:', this.tecnico);
  }
  editarTecnico() {

    this.tecnico.role = "TECHNICIAN"
    this.tecnico.nome = this.tecnico.nome
    this.tecnico.senha = this.tecnico.senha
    this.tecnico.email = this.tecnico.email

    this.authService.updateTecnico(this.tecnico.id, this.tecnico).subscribe((resp: any) => {
      this.getallTecnico();
      console.log('Usuário editado com sucesso', resp);
    }, error => {
      console.error('Erro ao editar usuário', error);
    });

  }
}
