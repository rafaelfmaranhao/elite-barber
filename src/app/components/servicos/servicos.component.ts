import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.css'
})
export class ServicosComponent {
  servicos = [
    {
      nome: 'Corte de Cabelo',
      descricao: 'Cortes modernos e personalizados com técnica profissional',
      preco: 60.00,
      svg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--dourado)" stroke-width="2" style="width: 48px; height: 48px; margin: 0 auto 1rem;">
          <circle cx="6" cy="6" r="2"/>
          <circle cx="18" cy="6" r="2"/>
          <path d="M 8 8 L 12 12 L 8 16" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 16 8 L 12 12 L 16 16" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
    },
    {
      nome: 'Barba',
      descricao: 'Aparamento de barba com acabamento premium',
      preco: 45.00,
      svg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--dourado)" stroke-width="2" style="width: 48px; height: 48px; margin: 0 auto 1rem;">
          <circle cx="12" cy="8" r="4"/>
          <line x1="9" y1="12" x2="15" y2="12"/>
          <path d="M 8 12 L 12 18 L 16 12" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="10" y1="13" x2="10" y2="17" stroke-dasharray="2,2" stroke-opacity="0.6"/>
          <line x1="12" y1="13" x2="12" y2="17" stroke-dasharray="2,2" stroke-opacity="0.6"/>
          <line x1="14" y1="13" x2="14" y2="17" stroke-dasharray="2,2" stroke-opacity="0.6"/>
        </svg>
      `
    },
    {
      nome: 'Luzes',
      descricao: 'Técnica de iluminação e destaque para cabelo',
      preco: 120.00,
      svg: `
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--dourado)" stroke-width="2" style="width: 48px; height: 48px; margin: 0 auto 1rem;">
          <path d="M 12 3 C 9 3 7 5 7 8 C 7 11 9 13 10 15 L 14 15 C 15 13 17 11 17 8 C 17 5 15 3 12 3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="10" y="15" width="4" height="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="17" x2="12" y2="19"/>
          <line x1="12" y1="1" x2="12" y2="2"/>
          <line x1="16" y1="4" x2="16.7" y2="4.7"/>
          <line x1="8" y1="4" x2="7.3" y2="4.7"/>
        </svg>
      `
    }
  ];

  abrirModalLogin(): void {
    const event = new CustomEvent('abrirModalLogin');
    window.dispatchEvent(event);
  }
}

