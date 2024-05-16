import { Component, OnInit } from '@angular/core';
import { ChamadosService } from '../sevice/chamados.service';
import { Chamados } from '../model/Chamados';
import { Tecnico } from '../model/Tecnico';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenciamentoService } from '../sevice/gerenciamento.service';
import { AuthService } from '../sevice/auth.service';
import { Setor } from '../model/Setor';
import { Status } from '../model/Status';
import { Prioridade } from '../model/Prioridade';

@Component({
  selector: 'app-aceitarchamado',
  templateUrl: './aceitarchamado.component.html',
  styleUrls: ['./aceitarchamado.component.css']
})
export class AceitarchamadoComponent implements OnInit {

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gerenciamento: GerenciamentoService,
    private chamadoService: ChamadosService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id']
    this.findByIdChamado(id)
    };

  
  findByIdChamado(id: string) {
    this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados) => {
      this.chamado = resp
    })

  }
  
  updateTecnico() {

    this.tecnico.id = this.idTecnico
    this.chamado.tecnico = this.tecnico

    this.chamadoService.updateTecnicoByID(this.idChamado,this.tecnico).subscribe((resp:Chamados)=>{
      this.chamado = resp;
      this.router.navigate(['/verchamado'])
    })

  }
}
