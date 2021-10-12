import { Pedido } from "./Pedido"
import { Produto } from "./Produto"

export class Usuario{
    public idUsuario: number
    public nome: string
    public email: string
    public senha: string
    public produto:	Produto[]
    public pedidos: Pedido

}



