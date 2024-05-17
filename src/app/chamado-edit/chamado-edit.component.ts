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
import { Status } from '../model/Status';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chamado-edit',
  templateUrl: './chamado-edit.component.html',
  styleUrls: ['./chamado-edit.component.css']
})
export class ChamadoEditComponent implements OnInit {
  chamado: Chamados = new Chamados();
  listaDeChamados: Chamados[];
  idChamado : string

  tecnico: Tecnico = new Tecnico()
  idTecnico: number

  status: Status = new Status();
  listaDeStatus: Status[];
  idStatus: number

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
    this.getAllStatus()
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

  // updateTecnico() {
  //   this.chamado.id = this.idChamado;
  //   this.tecnico.id = this.idTecnico;

  //   this.chamado.tecnico = this.tecnico;
  
  //   this.chamadoService.updateTecnicoByID(this.tecnico).subscribe(
  //     (resp: Chamados) => {
        
  //       this.chamado = resp;
        
       
  //       this.router.navigate(['/verchamado']);
  //     },
  //     (error) => {
        
  //       console.error('Erro ao atualizar técnico:', error);
  //     }
  //   );
  // }
  


  atualizar() {
    this.prioridade.id = this.idPrioridade
    this.chamado.prioridade = this.prioridade

    this.status.id = this.idStatus
    this.chamado.status = this.status

    this.tecnico.id = this.idStatus
    this.chamado.tecnico = this.tecnico


    this.chamadoService.putChamados(this.chamado).subscribe(
      (resp: Chamados) => {
        this.chamado = resp;
        Swal.fire({
          title: 'Sucesso',
          text: 'Chamado atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/tecnico']);
        });
      },
      (error) => {
        console.error('Erro ao atualizar o chamado:', error);
        Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao atualizar o chamado. Por favor, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

}