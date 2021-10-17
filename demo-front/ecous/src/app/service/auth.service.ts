import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  /* GERA UMA URL DINAMICA TRAZENDO OS DADOS DO VALOR GLOBAL */
  public endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(

    private http: HttpClient,
    private router: Router,
   
  
  ) { }

  entrar (userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.put<UsuarioLogin>(`${this.endereco}/usuarios/login`, userLogin)

  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.endereco}/usuarios/novousuario`, user)

  }

  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.endereco}/usuarios`)
  }

  /* PESQUISA UM USUARIO POR ID */
  findByIdCliente(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.endereco}/usuarios/idusuario/${id}`, this.autorizacao);
  }

  findByIdClienteUsuarioLogin(id: number): Observable<UsuarioLogin> {

    return this.http.get<UsuarioLogin>(`${this.endereco}/usuarios/idusuario/${id}`, this.autorizacao);
  }


  atualizar(userLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.put<UsuarioLogin>(`${this.endereco}/usuarios/atualizarusuario`, userLogin); 
  }

  fomenu(){
    let ok = false
    if(this.router.url.includes('/home') || this.router.url.includes('/contato') || this.router.url.includes('/quemsomos') || this.router.url.includes('/produtos') || this.router.url.includes('/produto/')|| this.router.url.includes('/perfil') || this.router.url.includes('/pedido') || this.router.url.includes('/pagamento')){
      ok = true
    }
    return ok
  }


}
