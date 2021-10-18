import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { PedidoService } from '../service/pedido.service';
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

  usuarioLogin: UsuarioLogin = new UsuarioLogin;
  usuario: Usuario = new Usuario();
  token = environment.token

  userLogin: UsuarioLogin = new UsuarioLogin()
  tokenUsuario: string;

  /* DADOS CARRINHO USUARIO */
  pedido: Pedido = new Pedido();
  listaDePedidos: Pedido[];

  memoria: Produto[] = [];
  memoriaV: Produto[] = [];

  qtdItensProdutos: number;
  qtdItensListaDeDesejos: number;

  valorCarrinho: number;

  idCarrinho = environment.pedidos;

  idMemoria: number;

  

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertas: AlertasService,

    /* DADOS CARRINHO USUARIO */
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {

    let idProdutoR = this.route.snapshot.params['idProdutoR']

    console.log("ID: "+ idProdutoR);
    console.log("Token: "+ environment.token);
  

    this.findByIdProduto(idProdutoR)
    this.findAllByCategoria()
    this.findAllByProdutos()

   this.findByIdUsuarioLogin(environment.idUsuario)

   /* DADOS CARRINHO USUARIO */
   this.findByIdProdutosCarrinho();
   this.findByIdPedido();
  

  }

  findByIdUsuarioLogin(id: number) {
    this.authService.findByIdClienteUsuarioLogin(id).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      // environment.token = this.usuarioLogin.token;

      console.log("Token: "+ this.token);

    })

  }

  findByIdProduto(idProduto: number) {
    this.produtoService.getByIdProduto(idProduto).subscribe((resp: Produto) => {
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

    this.produtoService.adicionaItemListaDeDesejos(idProduto, environment.listaDeDesejos).subscribe(() => {
      
      this.alertas.showAlertSuccess('Produto adicionado a lista de desejos!');
      console.log("ID Lista: "+ environment.listaDeDesejos);
      console.log("ID Produto: "+ idProduto);
      this.findAllByProdutos();
      

    })

  }

  /* ADICIONA PRODUTOS AO CARRINHO DO USUARIO */
  adicionaItemCarrinho(idProduto: number, idCarrinho: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, environment.pedidos).subscribe(() => {
      /* DADOS CARRINHO USUARIO */
      console.log("ID Carrinho: "+ environment.pedidos);
      console.log("ID Produto: "+ idProduto);
      this.findByIdProdutosCarrinho();
      this.findByIdProduto(idProduto);
      this.alertas.showAlertSuccess('Item adicionado ao carrinho');

    })

  }

  findByIdPedido() {
    this.pedidoService.findByIdPedido(environment.pedidos).subscribe((resp: Pedido) => {
      this.pedido = resp;

      /* ARREDONDA O VALOR DECIMAL DEIXANDO SOMENTE 2 CASAS APOS A VIRGULA */
      this.valorCarrinho = Number(this.pedido.valorTotal.toFixed(2));

    })

  }

  findByIdProdutosCarrinho() {
    this.pedidoService.findAllByProdutosPedidos(environment.pedidos).subscribe((resp: Produto[]) => {
      this.listaDeProdutos = resp;

      try {
        this.qtdItensProdutos = this.listaDeProdutos.length;

      }catch(erro){
        //console.log('NAO FOI POSSIVEL CALCULAR OS ITENS!!');
      }

      try {
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
          this.memoria = this.listaDeProdutos;

          // ZERA O CONTADO PARA REMOCMECAR UMA NOVA CONTAGEM
          contador = 0;

        }

      }catch(erro){
        //console.log('OCORREU UM ERRO AO GERAR A LISTA DE PRODUTOS');

      }

      try{
        /* AGRUPA OS ITENS REPETIDOS DENTRO DO ARRAY */
        this.listaDeProdutos = this.listaDeProdutos.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.nome === item.nome && t.descricao === item.descricao
          ))
        )

      }catch(erro){
        //console.log('OCORREU UM ERRO AO AGRUPAR O ARRAY);

      }

    })

  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UsuarioLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.idUsuario = this.userLogin.idUsuario;
      environment.pedidos = this.userLogin.pedidos.id;
      environment.listaDeDesejos = this.userLogin.listaDeDesejos.id;

      console.log(environment.token);
      console.log(environment.idUsuario);
      console.log("Pedido ID: "+ environment.pedidos);
      console.log("Lista de Desejos ID: "+ environment.listaDeDesejos);
      
      let idProdutoR = this.route.snapshot.params['idProdutoR']
      console.log("ID: "+ idProdutoR);
      
      /* ARMAZENA O TOKEN DO USUARIO NA VARIAVEL */
      this.tokenUsuario = this.userLogin.token;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', this.tokenUsuario);
      
      this.router.navigate(['/produto', idProdutoR])
      // this.router.navigate([`/home`])
      this.alertas.showAlertSuccess('Usuário logado com sucesso.')
      
      this.router.navigate(['/produto', idProdutoR])
      this.token = this.tokenUsuario
    
      console.log("ID: "+ idProdutoR);
      console.log("Token: "+ this.tokenUsuario);
      console.log("Token: "+ this.token);

    }, erro =>{
      if(erro.status == 400){
        this.alertas.showAlertDanger('Usuário e/ou senha incorretos.')
      }
    })
  }

}
