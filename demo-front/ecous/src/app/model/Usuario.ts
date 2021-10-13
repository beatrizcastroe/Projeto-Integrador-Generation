import { ListaDeDesejos } from "./ListaDeDesejos"
import { Pedido } from "./Pedido"
import { Produto } from "./Produto"

export class Usuario{
    public idUsuario: number
    public nome: string
    public email: string
    public senha: string
    public produto:	Produto[]
    public pedidos: Pedido
    public listaDeDesejos: ListaDeDesejos
    public cep: string
    public bairro: string
    public cidade: string
    public complemento: string
    public estado: string
    public rua: string
    public numero: number

}



