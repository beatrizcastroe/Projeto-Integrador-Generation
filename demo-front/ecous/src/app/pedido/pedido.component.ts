import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';
import { PedidoService } from '../service/pedido.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  nome = environment.nome;
  email = environment.email;

  pedido: Pedido = new Pedido();
  listaDePedidos: Pedido[];

  listaDeProdutos: Produto[];
  memoria: Produto[] = [];
  memoriaV: Produto[] = [];

  idCarrinho = environment.pedidos;

  idMemoria: number;

  nomex: string

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {
    /*if(environment.token == '') {
      this.router.navigate(['/login']);
    }*/

    if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }

    /*let idProduto = this.route.snapshot.params['id-produto'];
    let idPedido = this.route.snapshot.params['id-pedido'];
    this.putProduto(idProduto, idPedido);*/

    this.findByIdProdutosCarrinho();
    this.findByIdPedido();

  }

  /* LISTA TODOS OS PEDIDOS CONTIDOS NA BASE DE DADOS */
  /*findAllByPedidos() {
    this.pedidoService.findAllByPedidos().subscribe((resp: Pedido[]) => {
      this.listaDePedidos = resp;
    })
  }*/

  /* POR MEIO DO ID TRAS SOMENTE OS DADOS DE UM UNICO PEDIDO */
  /*findByIdPedido(id: number) {
    this.pedidoService.findByIdPedido(id).subscribe((resp: Pedido) => {
      this.pedido = resp;
    })
  }*/

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(environment.pedidos).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

      let contador: number = 0;
      let repeticao: number = 0;

      // CRIA UM VETOR PARA SERVIR DE REFERENCIA NAS VALIDACOES
      let pivo: number[] = [this.listaDeProdutos.length];

      for(let i = 0; i < this.listaDeProdutos.length; i++) {
        // ARMAZENA O ID DENTRO DO PIVO PARA SERVIR DE REFERENCIA
        pivo[i] = this.listaDeProdutos[i].idProduto;

        // ENTRA NO LOOP DO PRODUTO TRABALHO NO MOMENTO
        for(let item of this.listaDeProdutos) {
          // VERIFICA SE O VALOR DO PIVO E O MESMO DO ID DO LOOP ATUAL NO QUAL ESTAMOS TRABALHANDO
          if(pivo[i] == item.idProduto) {
            // ADICIONA UM AO CONTADOR
            contador++;

          }

          // ATRIBUI O VALOR DO CONTADOR A QTD DE UM DETERMINADO PRODUTO DE ACORDO COM A QTD DESSE MESMO PRODUTO NA LISTA
          this.listaDeProdutos[i].qtdPedidoProduto = contador;

        }

        // INSERE O PRIMEIRO VALOR PARA INICIALIZAR OS VALORES NO VETOR
       // this.memoria = this.listaDeProdutos;

        /* AGRUPA OS ITENS REPETIDOS DENTRO DO ARRAY */
        this.listaDeProdutos = this.listaDeProdutos.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.nome === item.nome && t.descricao === item.descricao
          ))
        )
/*
        let ids = [];
        console.log(this.memoria[0].nome)
        for(let i = 0; i < this.memoria.length; i++) {
         this.nomex.push(this.memoria[i].nome);
        }

        for(let i = 0; i < this.memoria.length; i++) {
          for(let j = 0; j < this.memoria.length; j++) {
            if(ids.indexOf(this.memoria[j].nome) == -1) {
              this.memoriaV.push(this.memoria[i]);
            }
          }
        }

        console.log(this.memoriaV);

        this.listaDeProdutos = this.memoriaV;*/

        /*for(let q = 0; q < this.listaDeProdutos.length; q++) {
          for(let w = 0; w < this.listaDeProdutos.length; w++) {
            if(pivo[i] != repeticao && this.listaDeProdutos[pivo[q]] == this.memoriaV[w] ) {
              repeticao = pivo[i];
              this.memoriaV.push(this.listaDeProdutos[repeticao]);
            }
          }
        }*/

        // ZERA O CONTADO PARA REMOCMECAR UMA NOVA CONTAGEM
        contador = 0;

			}

    })

  }

  findByIdPedido() {
    this.pedidoService.findByIdPedido(environment.pedidos).subscribe((resp: Pedido) => {
      this.pedido = resp;

    })

  }

  removerDoCarrinho(idProduto: number, idPedido: number) {
    this.pedidoService.removerItemDoCarrinho(idProduto, idPedido).subscribe(() => {
      alert('Item removido do carrinho!');

      this.findByIdProdutosCarrinho();
      this.findByIdPedido();

    })

  }

  /* EM NOSSA ESTRUTURA ESSE METODO NAO SERA UTILIZADO, ESTA MAIS AQUI POR FINS DIDATICOS */
  postPedido() {
    this.pedidoService.postPedido(this.pedido).subscribe((resp: Pedido) => {
      this.pedido = resp;

      alert('Pedido cadastrado com sucesso');

      this.router.navigate(['/pedido']);

    })

  }

  /*putProduto(idProduto: number, idPedido: number) {
    this.pedidoService.putProduto(idProduto, idPedido).subscribe(() => {
      this.router.navigate(['/pedido']);
    })
  }*/

}
