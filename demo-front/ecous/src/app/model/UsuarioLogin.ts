import { ListaDeDesejos } from "./ListaDeDesejos"
import { Pedido } from "./Pedido"

export class UsuarioLogin{

    public idUsuario: number
    public nome: string
    public email: string
    public senha: string
    public foto: string
    public token: string
    public pedidos: Pedido
    public bairro: string
    public listaDeDesejos: ListaDeDesejos
    public cep: string
    public cidade: string
    public complemento: string
    public estado: string
    public rua: string
    public numero: number

}