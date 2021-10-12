import { ListaDeDesejos } from "./ListaDeDesejos"
import { Pedido } from "./Pedido"

export class UsuarioLogin{

    public idUsuario: number
    public nome: string
    public email: string
    public senha: string
    public token: string
    public pedidos: Pedido;
    public listaDeDesejos: ListaDeDesejos;

}