import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamados } from 'src/app/model/Chamados';
import { Prioridade } from 'src/app/model/Prioridade';
import { Setor } from 'src/app/model/Setor';
import { Status } from 'src/app/model/Status';
import { Tecnico } from 'src/app/model/Tecnico';
import { AuthService } from 'src/app/sevice/auth.service';
import { ChamadosService } from 'src/app/sevice/chamados.service';
import { GerenciamentoService } from 'src/app/sevice/gerenciamento.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-chamadoadim-edit',
  templateUrl: './chamadoadim-edit.component.html',
  styleUrls: ['./chamadoadim-edit.component.css']
})
export class ChamadoadimEditComponent implements OnInit {

  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];
  idChamado: string

  status: Status = new Status();
  listaDeStatus: Status[];
  idStatus: number


  tecnico: Tecnico = new Tecnico()
  idTecnico: number

  idPrioridade: number;
  prioridade: Prioridade = new Prioridade;
  listaPrioridade: Prioridade[];

  idSetores: number;
  setor: Setor = new Setor;
  listaSetor: Setor[];

  nome = environment.nome

  constructor( private router: Router,
    private route: ActivatedRoute,
    private gerenciamento: GerenciamentoService,
    private chamadoService: ChamadosService,
    private authService: AuthService,) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']

    this.findByIdChamado(id)
    this.getAllSetores()
    this.getAllPrioridade()
    this.getAllStatus()

  }


  findByIdChamado(id: string) {
    this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados) => {
      this.chamado = resp
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

  findByIdTecnico(idTecnico: number) {
    this.authService.getByIdTecnico(idTecnico).subscribe((resp: Tecnico) => {
      this.tecnico = resp
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


  atualizar() {
    this.prioridade.id = this.idPrioridade
    this.chamado.prioridade = this.prioridade
    
    this.setor.id = this.idSetores
    this.chamado.setor = this.setor

    this.status.id = this.idStatus
    this.chamado.status = this.status

    this.chamadoService.putChamados(this.chamado).subscribe(
      (resp: Chamados) => {
        this.chamado = resp;
        this.router.navigate(['/verchamado']);
      },
      (error) => {
        console.error('Erro ao atualizar o chamado:', error);
      }
    );
  }
}