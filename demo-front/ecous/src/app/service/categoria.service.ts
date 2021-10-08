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
    return this.http.get<Categoria[]>('https://projetointegradorg1.herokuapp.com/categorias', this.token)
  }

  getByIdCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`https://projetointegradorg1.herokuapp.com/categorias/id/${id}`, this.token)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>('https://projetointegradorg1.herokuapp.com/categorias/novacategoria', categoria, this.token)

  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>('https://projetointegradorg1.herokuapp.com/categorias/atualizarcategoria', categoria, this.token)
  }

  deleteCategoria(id: number) {
    return this.http.delete(`https://projetointegradorg1.herokuapp.com/categorias/deletar/${id}`, this.token)
  }
}
