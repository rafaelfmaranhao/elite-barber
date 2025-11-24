import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ServicosComponent } from './components/servicos/servicos.component';
import { ModalAgendamentoComponent } from './components/modal-agendamento/modal-agendamento.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { PainelClienteComponent } from './components/painel-cliente/painel-cliente.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicosComponent,
    ModalAgendamentoComponent,
    ModalLoginComponent,
    PainelClienteComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}

