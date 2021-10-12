import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-listagem-produto',
  templateUrl: './listagem-produto.component.html',
  styleUrls: ['./listagem-produto.component.css']
})
export class ListagemProdutoComponent implements OnInit {
  listaProdutos: Produto []
  produto: Produto = new Produto()

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria []
  idCategoria: number

  user: Usuario = new Usuario()
  idUsuario = environment.idUsuario

  constructor(
    private router: Router, 
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private authService: AuthService

  ) { }

  ngOnInit() {

    this.getAllCategorias()
    this.getAllProdutos()
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
    })
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByIdUser(){
    this.produtoService.getByIdUser(this.idUsuario).subscribe((resp: Usuario) =>{
      this.user = resp
    })
  }

  publicar(){
    this.categoria.idCategoria = this.idCategoria
    this.produto.categoriaRelacionada = this.categoria

    this.user.idUsuario = this.idUsuario
    this.produto.usuarioRelacionado = this.user

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Produto cadastrado com sucesso!')
      this.produto = new Produto
      this.getAllProdutos()
    })
  }
  listagemCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria)=>{
      this.categoria = resp
    })
  }
}
