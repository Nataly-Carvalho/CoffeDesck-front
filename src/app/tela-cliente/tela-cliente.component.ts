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
import { Status } from '../model/Status';
import { Tecnico } from '../model/Tecnico';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-cliente',
  templateUrl: './tela-cliente.component.html',
  styleUrls: ['./tela-cliente.component.css']
})
export class TelaClienteComponent implements OnInit {

  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];

  status: Status = new Status();
  listaDeStatus: Status[];
  idStatus: number

  tecnico: Tecnico = new Tecnico();
  listaDeTecnico: Tecnico[];
  idTecnico: number

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

  filtro: string = 'finalizados';
  listaChamadosFiltrados: Chamados[] = []; // Array para armazenar chamados filtrados


  constructor(
    private router: Router,
    private chamadoService: ChamadosService,
    private authService: AuthService,
    private gerenciamento: GerenciamentoService
  ) { }



  ngOnInit(): void {
    window.scroll(0,0)
    if (environment.token == ''){
      //this.router.navigate(['/inicio'])
    }

    this.getAllChamados()
    this.getAllSetores()
    this.getAllPrioridade()
    this.findByIdUser()
    this.getAllStatus()
    this.getallTecnico()

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

  findByIdTecnico(){
    this.authService.getByIdTecnico(this.idTecnico).subscribe((resp: Tecnico)=>{
      this.tecnico = resp
    })
  }
  getallTecnico(){
    this.authService.getAllTecnico().subscribe((resp: Tecnico[])=>{
      this.listaDeTecnico = resp
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
  findByIdStatus(){
    this.gerenciamento.getByIdStatus(this.idStatus).subscribe((resp: Status)=>{
      this.status= resp

    })
  }
  getAllStatus() {
    this.gerenciamento.getAllStatus().subscribe((resp: Status[]) => {
      this.listaDeStatus = resp
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

    this.status.id = this.idStatus
    this.chamado.status = this.status

    this.chamado.setor = this.setor
    this.chamado.prioridade = this.prioridade

    this.user.id = this.idUser
    this.chamado.usuario = this.user

    this.chamadoService.postChamados(this.chamado).subscribe((resp: Chamados) => {
      this.chamado = resp

      Swal.fire({
        title: 'Sucesso',
        text: 'O chamado foi registrado e será solucionado o mais breve possível.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.chamado = new Chamados();
        this.getAllChamados(); 
      });
    });
  }

  abrirDetalhes(chamado: Chamados) {
    this.chamadoSelecionado = chamado; }
  }
