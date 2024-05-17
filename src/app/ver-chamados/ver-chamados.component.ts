import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamados } from 'src/app/model/Chamados';
import { AuthService } from 'src/app/sevice/auth.service';
import { ChamadosService } from 'src/app/sevice/chamados.service';
import { GerenciamentoService } from 'src/app/sevice/gerenciamento.service';
import { environment } from 'src/environments/environment.prod';
import { Prioridade } from '../model/Prioridade';
import { User } from '../model/User';
import { Tecnico } from '../model/Tecnico';
import { Setor } from '../model/Setor';



@Component({
  selector: 'app-ver-chamados',
  templateUrl: './ver-chamados.component.html',
  styleUrls: ['./ver-chamados.component.css']
})
export class VerChamadosComponent implements OnInit {

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


  constructor( private router: Router,
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
      this.getallTecnico()
      this.getallUsers()
    }

    findByIdChamado(id:string){
      this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados)=>{
        this.chamado = resp
      })
    }
    getAllPrioridade() {
      this.gerenciamento.getAllPrioridade().subscribe((resp: Prioridade[]) => {
        this.listaPrioridade = resp
      })
    }
    getAllSetores() {
      this.gerenciamento.getAllSetores().subscribe((resp: Setor[]) => {
        this.listaSetor = resp
      })
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
  
    
  
    sair() {
      this.router.navigate(['/inicio'])
      environment.token = ''
      environment.nome = ''
      environment.id = 0
  
    }
  
}