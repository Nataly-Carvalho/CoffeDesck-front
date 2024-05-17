import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamados } from 'src/app/model/Chamados';
import { AuthService } from 'src/app/sevice/auth.service';
import { ChamadosService } from 'src/app/sevice/chamados.service';
import { GerenciamentoService } from 'src/app/sevice/gerenciamento.service';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-ver-chamados',
  templateUrl: './ver-chamados.component.html',
  styleUrls: ['./ver-chamados.component.css']
})
export class VerChamadosComponent implements OnInit {

  chamado: Chamados = new Chamados()
  listaDeChamados: Chamados[]
  

  constructor( private router: Router,
    private chamadoService: ChamadosService
  ) { }

 
    ngOnInit(): void {
      window.scroll(0,0)
      if (environment.token == ''){
        this.router.navigate(['/inicio'])
      }

      this.getAllChamados()
      
    }

    findByIdChamado(id:string){
      this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados)=>{
        this.chamado = resp
      })
    }

    getAllChamados(){
      this.chamadoService.getAllChamados().subscribe((resp: Chamados[])=>{
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