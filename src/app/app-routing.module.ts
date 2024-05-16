import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
import { TelaTecnicoComponent } from './tela-tecnico/tela-tecnico.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';
import { VerChamadosComponent } from './ver-chamados/ver-chamados.component';
import { VerClientesComponent } from './ver-clientes/ver-clientes.component';
import { CadastroTecnicoComponent } from './cadastro-tecnico/cadastro-tecnico.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { VerTecnicosComponent } from './ver-tecnicos/ver-tecnicos.component';
import { ChamadoEditComponent } from './chamado-edit/chamado-edit.component';
import { DeleteUsuarioComponent } from './delete/delete-usuario/delete-usuario.component';
import { DeletetecnicoComponent } from './delete/deletetecnico/deletetecnico.component';
import { ChamadoadimEditComponent } from './edit/chamadoadim-edit/chamadoadim-edit.component';
import { DeleteChamadoComponent } from './delete/delete-chamado/delete-chamado.component';
import { AceitarchamadoComponent } from './aceitarchamado/aceitarchamado.component';


const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch:"full"},

  {path: 'inicio', component:InicioComponent},
  {path: 'cadastro', component:CadastroComponent},
  {path: 'login', component:LoginComponent},
  {path: 'cliente', component:TelaClienteComponent},
  {path: 'tecnico', component:TelaTecnicoComponent},
  {path: 'admin', component:TelaAdminComponent},
  {path: 'verchamado', component:VerChamadosComponent},
  {path: 'verclientes', component:VerClientesComponent},
  {path: 'cadastrotecnico', component:CadastroTecnicoComponent},
  {path: 'vertecnico', component:VerTecnicosComponent},
  {path: 'gerenciamento', component:GerenciamentoComponent},
  {path: 'chamadoedit/:id', component:ChamadoEditComponent},
  {path: 'deleteusuario/:id',component:DeleteUsuarioComponent},
  {path: 'deletetecnico/:id', component:DeletetecnicoComponent},
  {path: 'chamadoeditadmin/:id',component:ChamadoadimEditComponent},
  {path: 'excluirchamado/:id',component:DeleteChamadoComponent},
  {path: 'aceitarchamado/:id', component: AceitarchamadoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
