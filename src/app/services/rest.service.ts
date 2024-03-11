import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http:HttpClient) { }

  /* URL APIs */
  private url = 'http://localhost:3000/usuarios'


  public getUsuario():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }

  public postUsuario(usuario:Usuario):Observable<any> {
    return this.http.post(this.url, usuario);
  }

  public putUsuario(usuario: Usuario): Observable<any> {
    let urlWithId = `${this.url}/${usuario.id}`;
    return this.http.put(urlWithId, usuario);
  }

  
  public deleteUsuario(id: any): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url, id);
  }

  /* Simulo la contraseña y mail que se encuentra en la BD para verificar */
  public loginUsuario(credentials: any): Observable<any> {
    return this.http.post(this.url, credentials);
  }
}
