import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  abrirModalAgendamento(): void {
    const event = new CustomEvent('abrirModalAgendamento');
    window.dispatchEvent(event);
  }

  abrirModalLogin(): void {
    const event = new CustomEvent('abrirModalLogin');
    window.dispatchEvent(event);
  }
}

