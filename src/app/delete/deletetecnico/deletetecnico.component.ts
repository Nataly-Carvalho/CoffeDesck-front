import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/model/Tecnico';
import { AuthService } from 'src/app/sevice/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-deletetecnico',
  templateUrl: './deletetecnico.component.html',
  styleUrls: ['./deletetecnico.component.css']
})
export class DeletetecnicoComponent implements OnInit {
  Tecnico: Tecnico = new Tecnico()
  idTecnico: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (environment.token == '') {
      this.router.navigate(['/login'])
    }
    this.idTecnico = this.route.snapshot.params['id']
    this.findByIdTecnico(this.idTecnico)
  }

  findByIdTecnico(id: number) {
    this.authService.getByIdTecnico(id).subscribe((resp: Tecnico) => {
      this.Tecnico = resp
    })
  }

  apagar() {
    this.authService.deleteTecnico(this.idTecnico).subscribe(() => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Técnico apagado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/vertecnico']);
      });
    }, (error) => {
      console.error('Erro ao apagar o técnico:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao apagar o técnico. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
}
