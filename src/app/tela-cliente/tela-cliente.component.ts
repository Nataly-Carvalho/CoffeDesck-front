import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Chamados } from '../model/Chamados';
import { ChamadosService } from '../sevice/chamados.service';
import { AuthService } from '../sevice/auth.service';
import { User } from '../model/User';
import { GerenciamentoService } from '../sevice/gerenciamento.service';
import { Prioridade } from '../model/Prioridade';
import { Setor } from '../model/Setor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-cliente',
  templateUrl: './tela-cliente.component.html',
  styleUrls: ['./tela-cliente.component.css']
})
export class TelaClienteComponent implements OnInit {

  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];

  user: User = new User()
  idUser = environment.id

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
    private chamadoService: ChamadosService,
    private authService: AuthService,
    private gerenciamento: GerenciamentoService
  ) { }



  ngOnInit(): void {
    window.scroll(0,0)
    if (environment.token == ''){
      this.router.navigate(['/inicio'])
    }

    this.getAllChamados()
    this.getAllSetores()
    this.getAllPrioridade()
    this.findByIdUser()

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

  findByIdSetor() {
    this.gerenciamento.getByIdSetor(this.idSetores).subscribe((resp: Setor) => {
      this.setor = resp
    })
  }
    getAllChamados() {
    this.chamadoService.getAllChamados().subscribe((resp: Chamados[]) => {
      this.listaDeChamados = resp
    })
  }

  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

  }
  criarChamado() {

    this.prioridade.id = this.idPrioridade
    this.setor.id = this.idSetores

    this.chamado.setor = this.setor
    this.chamado.prioridade = this.prioridade

    this.user.id = this.idUser
    this.chamado.usuario = this.user

    this.chamadoService.postChamados(this.chamado).subscribe((resp: Chamados) => {
      this.chamado = resp

      alert('Chamado criado com sucesso!')

      this.chamado = new Chamados()
      this.getAllChamados()
    })
  }

  abrirDetalhes(chamado: Chamados) {
    this.chamadoSelecionado = chamado; }
  }
