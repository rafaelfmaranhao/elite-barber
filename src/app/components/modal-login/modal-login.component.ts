import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.css'
})
export class ModalLoginComponent implements OnInit, OnDestroy {
  mostrarModal = false;
  abaAtiva: 'login' | 'cadastro' = 'login';
  
  emailLogin = '';
  senhaLogin = '';
  
  nomeCadastro = '';
  emailCadastro = '';
  whatsappCadastro = '';
  senhaCadastro = '';
  senhaConfirm = '';

  private abrirModalListener: any;
  private fecharModalListener: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.abrirModalListener = () => this.abrirModal();
    this.fecharModalListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.fecharModal();
      }
    };
    window.addEventListener('abrirModalLogin', this.abrirModalListener);
    window.addEventListener('keydown', this.fecharModalListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('abrirModalLogin', this.abrirModalListener);
    window.removeEventListener('keydown', this.fecharModalListener);
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.abaAtiva = 'login';
    this.limparFormularios();
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.limparFormularios();
  }

  limparFormularios(): void {
    this.emailLogin = '';
    this.senhaLogin = '';
    this.nomeCadastro = '';
    this.emailCadastro = '';
    this.whatsappCadastro = '';
    this.senhaCadastro = '';
    this.senhaConfirm = '';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-login')) {
      this.fecharModal();
    }
  }

  mudarTab(tab: 'login' | 'cadastro'): void {
    this.abaAtiva = tab;
  }

  fazerLogin(event: Event): void {
    event.preventDefault();

    if (!this.emailLogin || !this.senhaLogin) {
      alert('Preencha e-mail e senha!');
      return;
    }

    if (this.authService.login(this.emailLogin, this.senhaLogin)) {
      this.fecharModal();
      alert('Login realizado com sucesso!');
      this.router.navigate(['/painel']);
      window.dispatchEvent(new CustomEvent('atualizarPainel'));
    } else {
      alert('E-mail ou senha incorretos!');
    }
  }

  fazerCadastro(event: Event): void {
    event.preventDefault();

    if (!this.nomeCadastro || !this.emailCadastro || !this.whatsappCadastro || !this.senhaCadastro) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.senhaCadastro !== this.senhaConfirm) {
      alert('As senhas não coincidem!');
      return;
    }

    if (this.senhaCadastro.length < 4) {
      alert('A senha deve ter pelo menos 4 caracteres!');
      return;
    }

    const novoUsuario = {
      nome: this.nomeCadastro.trim(),
      email: this.emailCadastro.trim().toLowerCase(),
      whatsapp: this.whatsappCadastro.trim(),
      senha: this.senhaCadastro
    };

    if (this.authService.cadastrar(novoUsuario)) {
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      this.mudarTab('login');
    } else {
      alert('Este e-mail já está cadastrado!');
    }
  }
}

