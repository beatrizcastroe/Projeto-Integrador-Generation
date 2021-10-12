import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  api = environment.server + environment.port;

  autorizacao = {
    //headers: new HttpHeaders().set('Authorization', environment.token)
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')

  }

  constructor(
    private http: HttpClient

  ) { }

  findByIdListaDeDesejos(id: number): Observable<ListaDeDesejos> {

    return this.http.get<ListaDeDesejos>(`${this.api}/listadesejo/${id}`, this.autorizacao);
  }

  findAllByProdutosListaDeDesejos(id: number): Observable<Produto[]> {

    return this.http.get<Produto[]>(`${this.api}/listadesejo/listaDeDesejo/${id}`, this.autorizacao);
  }

  findAllByListaDeDesejos(): Observable<ListaDeDesejos[]> {

    return this.http.get<ListaDeDesejos[]>(`${this.api}/listadesejo`, this.autorizacao);
  }

  removerItemListaDeDesejos(idProduto: number, idListaDeDesejo: number): Observable<Produto[]> {

    return this.http.delete<Produto[]>(`${this.api}/listadesejo/produto_lista/produtos/${idProduto}/listaDesejos/${idListaDeDesejo}`, this.autorizacao);
  }
}