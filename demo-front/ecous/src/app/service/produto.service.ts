import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(

    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>('https://ecousteste.herokuapp.com/produtos')
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://ecousteste.herokuapp.com/produtos/novoproduto', produto)
  }

  getByIdProduto(idProduto: number): Observable<Produto>{
    return this.http.get<Produto>(`https://ecousteste.herokuapp.com/produtos/idproduto/${idProduto}`)
  }
  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://ecousteste.herokuapp.com/produtos/atualizarproduto', produto)
  }
  deleteProduto(idProduto: number){
    return this.http.delete(`https://ecousteste.herokuapp.com/produtos/deletarproduto/${idProduto}`)
  }

  getByIdUser(idUsuario: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://ecousteste.herokuapp.com/usuarios/idusuario/${idUsuario}`)
  }
}
