import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prioridade } from '../model/Prioridade';
import { Chamados } from '../model/Chamados';
import { User } from '../model/User';
import { Tecnico } from '../model/Tecnico';
import { Setor } from '../model/Setor';
import { environment } from 'src/environments/environment.prod';
import { GerenciamentoService } from '../sevice/gerenciamento.service';
import { ChamadosService } from '../sevice/chamados.service';
import { AuthService } from '../sevice/auth.service';

@Component({
  selector: 'app-chamado-edit',
  templateUrl: './chamado-edit.component.html',
  styleUrls: ['./chamado-edit.component.css']
})
export class ChamadoEditComponent implements OnInit {
  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];
  idChamado: string

  tecnico: Tecnico = new Tecnico()
  idTecnico: number

  idPrioridade: number;
  prioridade: Prioridade = new Prioridade;
  listaPrioridade: Prioridade[];

  idSetores: number;
  setor: Setor = new Setor;
  listaSetor: Setor[];

  nome = environment.nome

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gerenciamento: GerenciamentoService,
    private chamadoService: ChamadosService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    let id = this.route.snapshot.params['id']

    this.findByIdChamado(id)
    this.getAllSetores()
    this.getAllPrioridade()


  }


  findByIdChamado(id: string) {
    this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados) => {
      this.chamado = resp
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

    this.chamadoService.updateTecnicoByID(this.chamado.id, this.chamado.tecnico).subscribe(
      (resp: Chamados) => {
        this.chamado = resp;
        this.router.navigate(['/tecnico']);
      },
      (error) => {
        console.error('Erro ao atualizar o chamado:', error);
      }
    );
  }




}
