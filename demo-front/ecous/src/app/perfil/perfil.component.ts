import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ListaDeDesejos } from '../model/ListaDeDesejos';
import { Pedido } from '../model/Pedido';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CepService } from '../service/cep.service';
import { ClienteService } from '../service/cliente.service';
import { PedidoService } from '../service/pedido.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  title = 'CepAngular';

  nome = environment.nome;
  email = environment.email;
  idUsuario = environment.idUsuario;
  idPedido = environment.pedidos;

  minhListaDeDesejos: ListaDeDesejos = new ListaDeDesejos();
  listaDeDesejosItens: ListaDeDesejos[];
  idListaDeDesejos = environment.listaDeDesejos;

  produto: Produto = new Produto();
  listaDeDesejos: Produto[];
  listaDeProdutoMemoria: Produto[];

  usuarioLogin: UsuarioLogin = new UsuarioLogin;
  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;

  /* DADOS CARRINHO USUARIO */
  pedido: Pedido = new Pedido();
  listaDePedidos: Pedido[];

  listaDeProdutos: Produto[];
  memoria: Produto[] = [];
  memoriaV: Produto[] = [];

  qtdItensProdutos: number;
  qtdItensListaDeDesejos: number;

  valorCarrinho: number;

  idCarrinho = environment.pedidos;

  idMemoria: number;

  /* ###################### */

  constructor(
    private cepService: CepService,
    private router: Router,
    private listaDeDesejosService: ClienteService,
    private authService: AuthService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private alertas: AlertasService,

     /* DADOS CARRINHO USUARIO */
     private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == ''){
      this.router.navigate(['/login'])
    }

    let id = environment.idUsuario
    this.findByIdUsuario(id)
    this.findByIdUsuarioLogin(id)

    this.findByIdListaDeDesejos();
    this.findByIdUsuario(environment.idUsuario);
    //this.findAllByProduto();

    /* DADOS CARRINHO USUARIO */
    this.findByIdProdutosCarrinho();
    this.findByIdPedido();
    
  }

  consultaCep(valor:string, form){
    this.cepService.buscar(valor).subscribe((dados) => this.populaForm(dados, form));
  }

  populaForm(dados, form){
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    })
  }

  findByIdUsuarioLogin(id: number) {
    this.authService.findByIdClienteUsuarioLogin(id).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;

      console.log("Nome: "+ this.usuario.nome);

    })

  }

  findByIdUsuario(id: number) {
    this.authService.findByIdCliente(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

      console.log("Nome: "+ this.usuario.nome);

    })

  }

  

  tipoUser(event: any) {
    /* ATRIBUI O DADO VINDO DO HTML POR MEIO DO [(ngModel)] A VARIAVEL CRIADA */
    this.tipoUsuario = event.target.value;

  }


  findByIdListaDeDesejos() {
    this.listaDeDesejosService.findAllByProdutosListaDeDesejos(environment.listaDeDesejos).subscribe((resp: Produto[]) => {
      this.listaDeDesejos = resp;

      try {
        this.qtdItensListaDeDesejos = resp.length;

      }catch(erro){
        //console.log('NAO FOI POSSIVEL CALCULAR OS ITENS!!');
      }

    })

  }

  removerDaListaDeDesejos(idProduto: number, idLista: number) {
    this.listaDeDesejosService.removerItemListaDeDesejos(idProduto, idLista).subscribe(() => {
      this.alertas.showAlertSuccess('Item removido da lista de desejos');

      this.findByIdPedido();
      this.findByIdListaDeDesejos();

    })

  }

  /* ADICIONA PRODUTOS AO CARRINHO DO USUARIO */
  adicionaItemCarrinho(idProduto: number, idCarrinho: number) {
    this.produtoService.adicionaItemCarrinho(idProduto, idCarrinho).subscribe(() => {
      /* DADOS CARRINHO USUARIO */
      this.findByIdProdutosCarrinho();
      this.alertas.showAlertSuccess('Item adicionado ao carrinho');

    })

  }

  /* ################################################################################# */
  /* ################## DADOS CARRINHO USUARIO ################## */

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

  findByIdPedido() {
    this.pedidoService.findByIdPedido(environment.pedidos).subscribe((resp: Pedido) => {
      this.pedido = resp;

      /* ARREDONDA O VALOR DECIMAL DEIXANDO SOMENTE 2 CASAS APOS A VIRGULA */
      this.valorCarrinho = Number(this.pedido.valorTotal.toFixed(2));

    })

  }

  removerDoCarrinho(idProduto: number, idPedido: number) {
    this.pedidoService.removerItemDoCarrinho(idProduto, idPedido).subscribe(() => {
      this.alertas.showAlertSuccess('Item removido do carrinho!');

      this.findByIdProdutosCarrinho();
      this.findByIdPedido();

    })

  }

  /* EM NOSSA ESTRUTURA ESSE METODO NAO SERA UTILIZADO, ESTA MAIS AQUI POR FINS DIDATICOS */
  postPedido() {
    this.pedidoService.postPedido(this.pedido).subscribe((resp: Pedido) => {
      this.pedido = resp;

      this.alertas.showAlertSuccess('Pedido cadastrado com sucesso');

      this.router.navigate(['/pedido']);

    })

  }

  atualizarUser() {
   
 
      //this.usuarioLogin.listaDeDesejos = new ListaDeDesejos
      //this.usuarioLogin.pedidos = new Pedido
      console.log("user"+JSON.stringify(this.usuarioLogin))
      console.log("confirmarSenha"+ this.confirmarSenha)
      this.authService.atualizar(this.usuarioLogin).subscribe((resp: UsuarioLogin) =>{
        this.usuarioLogin = resp 
        this.router.navigate(['/perfil'])
        this.alertas.showAlertSuccess('Perfil atualizado com sucesso')
      })

    }

    confirmSenha(event: any) {
      this.confirmarSenha = event.target.value
    }

  }

  /* PEMISSAO DE ADMINISTRADOR 
  adm (){
    let permissao = false;

    if(environment.tipo == 'adm') {
      permissao = true;

    }

    return permissao;

  }*/


