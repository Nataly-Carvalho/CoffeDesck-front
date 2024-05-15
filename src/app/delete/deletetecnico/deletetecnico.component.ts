import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/model/Tecnico';
import { AuthService } from 'src/app/sevice/auth.service';
import { environment } from 'src/environments/environment.prod';

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
      alert("Tecnico apagado com sucesso!")
      this.router.navigate(['/vertecnico'])
    })
  }
}
