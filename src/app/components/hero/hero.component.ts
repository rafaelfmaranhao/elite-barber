import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  constructor(public authService: AuthService) {}

  abrirModalLogin(): void {
    const event = new CustomEvent('abrirModalLogin');
    window.dispatchEvent(event);
  }

  abrirModalAgendamento(): void {
    const event = new CustomEvent('abrirModalAgendamento');
    window.dispatchEvent(event);
  }
}

