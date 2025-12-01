import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ServicosComponent } from '../../components/servicos/servicos.component';
import { PainelClienteComponent } from '../../components/painel-cliente/painel-cliente.component';
import { ModalAgendamentoComponent } from '../../components/modal-agendamento/modal-agendamento.component';
import { ModalLoginComponent } from '../../components/modal-login/modal-login.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicosComponent,
    ModalLoginComponent,
    ModalAgendamentoComponent
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
