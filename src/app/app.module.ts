import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { TelaClienteComponent } from './tela-cliente/tela-cliente.component';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { TelaTecnicoComponent } from './tela-tecnico/tela-tecnico.component';
import { TelaAdminComponent } from './tela-admin/tela-admin.component';
import { CadastroTecnicoComponent } from './cadastro-tecnico/cadastro-tecnico.component';
import { VerClientesComponent } from './ver-clientes/ver-clientes.component';
import { VerChamadosComponent } from './ver-chamados/ver-chamados.component';
import { VerTecnicosComponent } from './ver-tecnicos/ver-tecnicos.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { ChamadoEditComponent } from './chamado-edit/chamado-edit.component';
import { DeleteUsuarioComponent } from './delete/delete-usuario/delete-usuario.component';
import { DeletetecnicoComponent } from './delete/deletetecnico/deletetecnico.component';
import { ChamadoadimEditComponent } from './edit/chamadoadim-edit/chamadoadim-edit.component';
import { DeleteChamadoComponent } from './delete/delete-chamado/delete-chamado.component';
import { AceitarchamadoComponent } from './aceitarchamado/aceitarchamado.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CadastroComponent,
    LoginComponent,
    TelaClienteComponent,
    TelaTecnicoComponent,
    TelaAdminComponent,
    CadastroTecnicoComponent,
    VerClientesComponent,
    VerChamadosComponent,
    VerTecnicosComponent,
    GerenciamentoComponent,
    ChamadoEditComponent,
    DeleteUsuarioComponent,
    DeletetecnicoComponent,
    ChamadoadimEditComponent,
    DeleteChamadoComponent,
    AceitarchamadoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   // ModalModule.forRoot(),
    OrderModule
  ],
  providers: [
    {
      provide:LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
