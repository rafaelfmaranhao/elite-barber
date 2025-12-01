import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { Cortes } from "../../components/menu-sections/cortes/cortes";
import { Barbas } from "../../components/menu-sections/barbas/barbas";
import { Luzes } from "../../components/menu-sections/luzes/luzes";
import { ModalAgendamentoComponent } from "../../components/modal-agendamento/modal-agendamento.component";
import { ModalLoginComponent } from "../../components/modal-login/modal-login.component";

@Component({
  selector: 'app-menu',
  imports: [HeaderComponent, Cortes, Barbas, Luzes, ModalAgendamentoComponent, ModalLoginComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

}
