import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/sevice/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent implements OnInit {

  user: User = new User()
  idUser: number
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (environment.token == '') {
    // this.router.navigate(['/login'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }
  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  apagar() {
    this.authService.delete(this.idUser).subscribe(() => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Usuário apagado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/verclientes']);
      });
    }, (error) => {
      console.error('Erro ao apagar o usuário:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao apagar o usuário. Por favor, tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

}
