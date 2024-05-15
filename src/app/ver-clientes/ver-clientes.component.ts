import { Component, OnInit } from '@angular/core';
import { AuthService } from '../sevice/auth.service';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.css']
})
export class VerClientesComponent implements OnInit {

  usuario: User = new User()
  listaUsuario: User[]

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    if (environment.token == '') {
      //alert('Sua seção expirou, faça login novamente!')
      this.router.navigate(['/inicio'])
    }
    this.getallUsers()
  
  }
  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.usuario = resp
    })
  }

  getallUsers(){
    this.authService.getAllUser().subscribe((resp: User[])=>{
      this.listaUsuario = resp
    })
  }

  

}
