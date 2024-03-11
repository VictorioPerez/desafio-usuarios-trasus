import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private usuarioSubject = new BehaviorSubject<any[]>([]);
  usuario$:Observable<any[]> = this.usuarioSubject.asObservable();

  private usuarioSeleccionadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioSeleccionado$ = this.usuarioSeleccionadoSubject.asObservable();

  private editandoUsuarioSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  editandoUsuario$: Observable<boolean> = this.editandoUsuarioSubject.asObservable();

  setEditandoUsuario(editando: boolean) {
    this.editandoUsuarioSubject.next(editando);
  }


  addUser(user: any) {
    let usuarios = [...this.usuarioSubject.value, user];
    this.usuarioSubject.next(usuarios);
  }
  
  updateUser(user: any) {
    let usuarios = this.usuarioSubject.value.map((u: any) => {
      return u.id === user.id ? { ...u, ...user } : u;
    });
    this.usuarioSubject.next(usuarios);
  }

  selectedUser(usuario: Usuario) {
    this.usuarioSeleccionadoSubject.next(usuario);
  }

  isAdminLoggedIn: boolean = false;

  setAdminLoggedIn(isLoggedIn: boolean) {
    this.isAdminLoggedIn = isLoggedIn;
  }

  getAdminLoggedIn() {
    return this.isAdminLoggedIn;
  }
}
