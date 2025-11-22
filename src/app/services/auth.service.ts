import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(this.getUsuarioFromStorage());
  public usuarioLogado$ = this.usuarioLogadoSubject.asObservable();

  private usuarios: Usuario[] = this.getUsuariosFromStorage();

  constructor() {
    this.usuarioLogado$.subscribe(usuario => {
      if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      } else {
        localStorage.removeItem('usuarioLogado');
      }
    });
  }

  private getUsuarioFromStorage(): Usuario | null {
    const stored = localStorage.getItem('usuarioLogado');
    return stored ? JSON.parse(stored) : null;
  }

  private getUsuariosFromStorage(): Usuario[] {
    const stored = localStorage.getItem('usuarios');
    return stored ? JSON.parse(stored) : [];
  }

  cadastrar(usuario: Usuario): boolean {
    if (this.usuarios.find(u => u.email === usuario.email)) {
      return false;
    }
    this.usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    return true;
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(u => u.email === email.toLowerCase() && u.senha === senha);
    if (usuario) {
      this.usuarioLogadoSubject.next(usuario);
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioLogadoSubject.next(null);
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioLogadoSubject.value;
  }

  isLoggedIn(): boolean {
    return this.usuarioLogadoSubject.value !== null;
  }
}

