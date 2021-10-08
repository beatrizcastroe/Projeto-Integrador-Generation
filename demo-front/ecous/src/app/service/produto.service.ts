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
    return this.http.get<Produto[]>('https://projetointegradorg1.herokuapp.com/produtos', this.token)
  }

  postProduto(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>('https://projetointegradorg1.herokuapp.com/produtos/novoproduto', produto, this.token)
  }

  getByIdProduto(idProduto: number): Observable<Produto>{
    return this.http.get<Produto>(`https://projetointegradorg1.herokuapp.com/produtos/idproduto/${idProduto}`, this.token)
  }
  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>('https://projetointegradorg1.herokuapp.com/produtos/atualizarproduto', produto, this.token)
  }
  deleteProduto(idProduto: number){
    return this.http.delete(`https://projetointegradorg1.herokuapp.com/produtos/deletarproduto/${idProduto}`, this.token)
  }

  getByIdUser(idUsuario: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://projetointegradorg1.herokuapp.com/usuarios/idusuario/${idUsuario}`, this.token)
  }
}
