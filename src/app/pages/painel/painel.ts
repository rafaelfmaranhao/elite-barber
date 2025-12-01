import { Component } from '@angular/core';
import { PainelClienteComponent } from "../../components/painel-cliente/painel-cliente.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ModalAgendamentoComponent } from "../../components/modal-agendamento/modal-agendamento.component";
import { ModalLoginComponent } from "../../components/modal-login/modal-login.component";

@Component({
  selector: 'app-painel',
  imports: [PainelClienteComponent, HeaderComponent, ModalAgendamentoComponent, ModalLoginComponent],
  templateUrl: './painel.html',
  styleUrl: './painel.css',
})
export class Painel {

}
