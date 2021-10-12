import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  endereco = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor( private http: HttpClient

    ) { }
  
    /* TRAZ TODOS OS PRODUTOS LISTANDO DENTRO DE PEDIDO/CLIENTE */
    findAllByPedidos(): Observable<Pedido[]> {
  
      return this.http.get<Pedido[]>(`${this.endereco}/pedidos`, this.autorizacao);
    }
  
    /* PESQUISA SOMENTE UM PEDIDO EM ESPECIFICO/CARRINHO/CLIENTE */
    findByIdPedido(id: number): Observable<Pedido> {
  
      return this.http.get<Pedido>(`${this.endereco}/pedidos/${id}`, this.autorizacao);
    }
  
    /* PESQUISA OS PRODUTOS INSERIDOS NO CARRINHO DO USUARIO */
    findAllByProdutosPedidos(idPedido: number): Observable<Produto[]> {
  
      return this.http.get<Produto[]>(`${this.endereco}/pedidos/meuspedidos/${idPedido}`, this.autorizacao);
    }
  
    /* INSERE UM NOVO DADO DENTRO DA BASE DE DADOS */
    postPedido(pedido: Pedido): Observable<Pedido> { //PARA PEDIDO NAO UTILIZAREMOS O POST DE PEDIDO
  
      return this.http.post<Pedido>(`${this.endereco}/pedidos`, pedido, this.autorizacao);
    }
  
    /* ATUALIZA UM DADOS EXISTENTE NA BASE DE DADOS */
    putPedido(pedido: Pedido): Observable<Pedido> {
  
      return this.http.put<Pedido>(`${this.endereco}/pedidos`, pedido, this.autorizacao);
    }
  
    /* DELETA UM DADO DA BASE DE DADOS */
    deletePedido(id: number): Observable<Pedido> {
  
      return this.http.delete<Pedido>(`${this.endereco}/pedidos/${id}`, this.autorizacao);
    }
  
    /* DELETA UM PRODUTO DA BASE DE DADOS POR MEIO DE TABELAS MANY TO MANY */
    putProduto(idProduto: number, idPedido: number): Observable<Pedido> {
  
      return this.http.delete<Pedido>(`${this.endereco}/pedidos/produto_pedido/produtos/${idProduto}/pedidos/${idPedido}`, this.autorizacao);
    }
  
    removerItemDoCarrinho(idProduto: number, idPedido: number): Observable<Pedido> {
  
      return this.http.delete<Pedido>(`${this.endereco}/pedidos/produto_pedido/produtos/${idProduto}/pedidos/${idPedido}`, this.autorizacao);
    }
}
