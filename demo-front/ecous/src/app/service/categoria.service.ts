import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(

    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>('https://ecousteste.herokuapp.com/categorias')
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`https://ecousteste.herokuapp.com/categorias/id/${id}`)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>('https://ecousteste.herokuapp.com/categorias/novacategoria', categoria)

  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>('https://ecousteste.herokuapp.com/categorias/atualizarcategoria', categoria)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`https://ecousteste.herokuapp.com/categorias/deletar/${id}`)
  }
}
