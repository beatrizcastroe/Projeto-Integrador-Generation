import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  endereco = environment.server + environment.port;

  constructor(

    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.endereco}/categorias`)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.endereco}/categorias/id/${id}`)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(`${this.endereco}/categorias/novacategoria`, categoria)

  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.endereco}/categorias/atualizarcategoria`, categoria)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.endereco}/categorias/deletar/${id}`)
  }
}
