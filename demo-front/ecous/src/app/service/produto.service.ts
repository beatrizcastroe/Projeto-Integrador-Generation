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

  endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(

    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.endereco}/produtos`)
  }

  getByIdProduto(idProduto: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.endereco}/produtos/idproduto/${idProduto}`)
  }
  
  getByIdUser(idUsuario: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.endereco}/usuarios/idusuario/${idUsuario}`)
  }

  getAllByNomeProdutos(descricao: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.endereco}/produtos/descricaoproduto/${descricao}`)
  }

  findAllByProdutos(): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.endereco}/produtos`);
  }

  findByIdProduto(id: number): Observable<Produto> {

    return this.http.get<Produto>(`${this.endereco}/produtos/${id}`);
  }

  findAllByNomeProdutos(nome: string): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.endereco}/produtos/nome/${nome}`);
  }

  postProduto(produto: Produto): Observable<Produto> {

    return this.http.post<Produto>(`${this.endereco}/produtos/novoproduto`, produto);
  }

  putProduto(produto: Produto): Observable<Produto> {

    return this.http.put<Produto>(`${this.endereco}/produtos/atualizarproduto`, produto);
  }

  compraProduto(idProduto: number, idPedido: number): Observable<Produto> {

    return this.http.put<Produto>(`${this.endereco}/produtos/produto_pedido/produtos/${idProduto}/pedidos/${idPedido}`, this.autorizacao);
  }

  adicionaItemListaDeDesejos(idProduto: number, idListaDeDesejo: number): Observable<Produto[]> {

    return this.http.put<Produto[]>(`${this.endereco}/produtos/produto_lista/produtos/${idProduto}/listaDesejos/${idListaDeDesejo}`, this.autorizacao);
  }

  adicionaItemCarrinho(idProduto: number, idPedido: number): Observable<Produto[]> {

    return this.http.put<Produto[]>(`${this.endereco}/produtos/produto_pedido/produtos/${idProduto}/pedidos/${idPedido}`, this.autorizacao);
  }

  deleteProduto(idProduto: number): Observable<Produto> {

    return this.http.delete<Produto>(`${this.endereco}/produtos/deletarproduto/${idProduto}`);
  }
}
