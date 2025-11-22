import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  scrollToServicos(): void {
    const servicos = document.getElementById('servicos');
    if (servicos) {
      servicos.scrollIntoView({ behavior: 'smooth' });
    }
  }

  abrirModalAgendamento(): void {
    const event = new CustomEvent('abrirModalAgendamento');
    window.dispatchEvent(event);
  }

  abrirModalLogin(): void {
    const event = new CustomEvent('abrirModalLogin');
    window.dispatchEvent(event);
  }
}

