import { Usuario } from "./Usuario"
import { Categoria } from "./Categoria"
import { Pedido } from "./Pedido"

export class Produto {

    public idProduto: number
    public nome: string
    public foto: string
    public marca: string
    public preco: number
    public descricao: string
    public usuarioRelacionado: Usuario
    public categoriaRelacionada: Categoria
    public estoque: number
    public pedidos: Pedido []
    public qtdPedidoProduto: number
}


