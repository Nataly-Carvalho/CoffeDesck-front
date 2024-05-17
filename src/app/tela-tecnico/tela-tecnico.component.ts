import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../sevice/auth.service';
import { GerenciamentoService } from '../sevice/gerenciamento.service';
import { Tecnico } from '../model/Tecnico';
import { Prioridade } from '../model/Prioridade';
import { Setor } from '../model/Setor';
import { Chamados } from '../model/Chamados';
import { ChamadosService } from '../sevice/chamados.service';
import { User } from '../model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-tecnico',
  templateUrl: './tela-tecnico.component.html',
  styleUrls: ['./tela-tecnico.component.css']
})
export class TelaTecnicoComponent implements OnInit {

  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];
  idChamado: string

  tecnico:Tecnico = new Tecnico()
  idTecnico = environment.id
  listaDeTecnico: Tecnico[]

  user:User=  new User()
  idUser: number
  listaDeusuarios: User[]

  chamadoSelecionado: Chamados;

  idPrioridade: number;
  prioridade: Prioridade = new Prioridade;
  listaPrioridade: Prioridade[];

  idSetores: number;
  setor: Setor = new Setor;
  listaSetor: Setor[];
  idTecnicoParaBusca: number;
  nome = environment.nome

  key = 'data'
  reverse = true

  chamadosFiltradosPorTecnico: Chamados[] = [];
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private gerenciamento: GerenciamentoService,
    private chamadoService: ChamadosService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)
    if (environment.token == ''){
      this.router.navigate(['/inicio'])
    }
    let id = this.route.snapshot.params['id']
    
    this.findByIdTecnico()
    this.getAllChamados()
    this.getAllSetores()
    this.getAllPrioridade()
    this.getallTecnico()
    this.getallUsers()
    this.filtrarChamadosPorTecnico();
    this.idTecnicoParaBusca = id;
    
  }
  findByIdTecnico(){
    this.authService.getByIdTecnico(this.idTecnico).subscribe((resp:Tecnico)=>{
      this.tecnico =resp
    })
  }
  filtrarChamadosPorTecnico() {
    console.log('ID do Técnico:', this.idTecnico);
    console.log('Lista de Chamados:', this.listaDeChamados);
  
    this.chamadosFiltradosPorTecnico = this.listaDeChamados.filter(chamado => {
      if (chamado.tecnico && chamado.tecnico.id && this.idTecnico) {
        return chamado.tecnico.id === this.idTecnico;
      } else {
        return false; // Ignorar chamados sem técnico definido ou sem ID
      }
    });
  
    console.log('Chamados Filtrados:', this.chamadosFiltradosPorTecnico);
  }
  
  getallTecnico(){
    this.authService.getAllTecnico().subscribe((resp: Tecnico[])=>{
      this.listaDeTecnico = resp
    })
  }
  getallUsers(){
    this.authService.getAllUser().subscribe((resp:User[])=>{
      this.listaDeusuarios = resp
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
  abrirDetalhes(chamado: Chamados) {
    this.chamadoSelecionado = chamado; }

  getAllSetores() {
    this.gerenciamento.getAllSetores().subscribe((resp: Setor[]) => {
      this.listaSetor = resp
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
  updateTecnico(chamado: Chamados): void {
    chamado.tecnico = this.tecnico;
    this.chamadoService.putChamados(chamado).subscribe(
      (updatedChamado: Chamados) => {
        this.chamado = updatedChamado;
  
        Swal.fire({
          icon: 'success',
          title: 'Chamado aceito!',
          text: 'Você aceitou o chamado com sucesso!',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Erro ao atualizar Chamado:', error);
  
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Ocorreu um erro ao atualizar o chamado. Por favor, tente novamente mais tarde.',
          confirmButtonText: 'OK'
        });
      }
    );
  }


  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

  }

  }


