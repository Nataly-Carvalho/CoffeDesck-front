import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrls: ['./tela-admin.component.css']
})
export class TelaAdminComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  sair() {
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.nome = ''
    environment.id = 0

  }

}
