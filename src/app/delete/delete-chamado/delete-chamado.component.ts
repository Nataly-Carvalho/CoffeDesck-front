import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamados } from 'src/app/model/Chamados';
import { ChamadosService } from 'src/app/sevice/chamados.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-chamado',
  templateUrl: './delete-chamado.component.html',
  styleUrls: ['./delete-chamado.component.css']
})
export class DeleteChamadoComponent implements OnInit {

  chamado: Chamados = new Chamados()
  idChamado:string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chamadoService: ChamadosService
  ) { }

  ngOnInit(): void {

    if(environment.token == ''){
      //this.router.navigate(['/login'])
    }
    this.idChamado = this.route.snapshot.params['id']
    this.findByIdChamado(this.idChamado)
  }

  findByIdChamado(id:string){
    this.chamadoService.getByIdChamados(id).subscribe((resp: Chamados)=>{
      this.chamado =resp
    })
  }

  apagar() {
    this.chamadoService.deleteChamado(this.idChamado).subscribe(() => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Chamado apagado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/verchamado']);
      });
    }, (error) => {
      console.error('Erro ao apagar o chamado:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao apagar o chamado. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

}
