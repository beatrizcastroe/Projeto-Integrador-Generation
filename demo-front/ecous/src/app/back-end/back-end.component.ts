import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-back-end',
  templateUrl: './back-end.component.html',
  styleUrls: ['./back-end.component.css']
})
export class BackEndComponent implements OnInit {

  listaProdutos: Produto []
  produto: Produto = new Produto()

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria []
  idCategoria: number

  listaUsuarios: Usuario []
  user: Usuario = new Usuario()
  idUsuario = environment.idUsuario
  confirmarSenha: string


  constructor(
    private router: Router, 
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/login-backend'])
    }

    this.getAllCategorias()
    this.getAllProdutos()
    this.getAllUsuarios()
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

  getAllUsuarios(){
    this.authService.getAllUsuarios().subscribe((resp: Usuario[]) => {
      this.listaUsuarios = resp
    })
  }

  publicar(){
    this.categoria.idCategoria = this.idCategoria
    this.produto.categoriaRelacionada = this.categoria

    //this.user.idUsuario = this.idUsuario
    // this.produto.usuarioRelacionado = this.user

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess('Produto cadastrado com sucesso!')
      this.produto = new Produto
      this.getAllProdutos()
    })
  }

  cadastrarCat(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria)=>{
      this.categoria = resp
      this.alertas.showAlertSuccess('Categoria cadastrado com sucesso!')
      this.getAllCategorias()
      this.categoria = new Categoria()
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  cadastrar() {
    console.log("user"+JSON.stringify(this.user))
    console.log("confirmarSenha"+ this.confirmarSenha)
 
    if (this.user.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.')
    }
    else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) =>{
        this.user = resp 
        this.router.navigate(['/backend'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso')
        this.getAllUsuarios()
      })

    }
  }

}