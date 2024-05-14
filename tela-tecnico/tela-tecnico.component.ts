import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../sevice/auth.service';
import { GerenciamentoService } from '../sevice/gerenciamento.service';
import { Tecnico } from '../model/Tecnico';
import { Prioridade } from '../model/Prioridade';
import { Setor } from '../model/Setor';
import { Chamados } from '../model/Chamados';
import { ChamadosService } from '../sevice/chamados.service';
import { User } from '../model/User';

@Component({
  selector: 'app-tela-tecnico',
  templateUrl: './tela-tecnico.component.html',
  styleUrls: ['./tela-tecnico.component.css']
})
export class TelaTecnicoComponent implements OnInit {

  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];

  tecnico:Tecnico = new Tecnico()
  idTecnico = environment.id

  user: User = new User()
  idUser: number

  chamadoSelecionado: Chamados;

  idPrioridade: number;
  prioridade: Prioridade = new Prioridade;
  listaPrioridade: Prioridade[];

  idSetores: number;
  setor: Setor = new Setor;
  listaSetor: Setor[];

  nome = environment.nome

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private authService: AuthService,
    private gerenciamento: GerenciamentoService,
    private chamadoService: ChamadosService,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)
    if (environment.token == ''){
      this.router.navigate(['/inicio'])
    }
    this.findByIdTecnico()
    this.getAllChamados()
    this.getAllSetores()
    this.getAllPrioridade()
    
  }
  
  

  findByIdTecnico(){
    this.authService.getByIdTecnico(this.idTecnico).subscribe((resp:Tecnico)=>{
      this.tecnico =resp
    })
  }
  getAllChamados() {
    this.chamadoService.getAllChamados().subscribe((resp: Chamados[]) => {
      this.listaDeChamados = resp
    })
  }

  findByIdSetor() {
    this.gerenciamento.getByIdSetor(this.idSetores).subscribe((resp: Setor) => {
      this.setor = resp
    })
  }

  getAllSetores() {
    this.gerenciamento.getAllSetores().subscribe((resp: Setor[]) => {
      this.listaSetor = resp
    })
  }
  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:User)=>{
      this.user =resp
    })
  }

  findByIdPrioridade() {
    this.gerenciamento.getByIdPrioridade(this.idPrioridade).subscribe((resp: Prioridade) => {
      this.prioridade = resp
    })
  }

  getAllPrioridade() {
    this.gerenciamento.getAllPrioridade().subscribe((resp: Prioridade[]) => {
      this.listaPrioridade = resp
    })
  }

  
atualizar(){
  this.chamado.tecnico.id = this.idTecnico;

  this.setor.id = this.idSetores
  this.prioridade.id = this.idPrioridade
  this.user.id = this.idUser

  this.chamado.setor = this.setor
  this.chamado.prioridade = this.prioridade
  this.chamado.usuario = this.user

  this.chamadoService.putChamados(this.chamado).subscribe((resp: Chamados)=>{
    this.chamado = resp
  })
}



  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

  }
  abrirDetalhes(chamado: Chamados) {
    this.chamadoSelecionado = chamado; }
  }


