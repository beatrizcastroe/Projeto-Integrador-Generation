import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private http: HttpClient,
    private router: Router
  
  ) { }

  entrar (userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>('https://projetointegradorg1.herokuapp.com/usuarios/login', userLogin)

  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://projetointegradorg1.herokuapp.com/usuarios/novousuario', user)

  }

  logado(){
    let ok = false
    if(environment.token == '' && this.router.url.includes('/home')){
      ok = true
    }
    return ok
  }
}
