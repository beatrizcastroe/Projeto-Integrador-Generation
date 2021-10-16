import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaDeProdutos: Produto[];
  idListaDeDesejos = environment.listaDeDesejos;
  idPedido = environment.pedidos;

  categoria: Categoria = new Categoria();
  listaDeCategoria: Categoria[];
  idCategoria: number;

  listaDeDesejos: ListaDeDesejos = new ListaDeDesejos();

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let id = this.route.snapshot.params['id']
    this.findByIdProduto(id)
    this.findAllByCategoria()
    this.findAllByProdutos()

  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  findAllByProdutos() {
    this.produtoService.findAllByProdutos().subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

    })

  }

  findAllByCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    })

  }

   /* ADICIONA PRODUTOS A LISTA DE DESEJOS DO USUARIO */
   adicionaItemListaDeDesejos(idProduto: number, idLista: number) {
    this.produtoService.adicionaItemListaDeDesejos(idProduto, idLista).subscribe(() => {
      alert('Produto adicionado a lista de desejos!');

      this.findAllByProdutos();

    })

  }

}
