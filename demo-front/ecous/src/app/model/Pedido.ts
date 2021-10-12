
import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export class Pedido {
    public id: number;
    public data: Date;
    public valorTotal: number;
    public qtdProduto: number;
    public produtos: Produto[];
    public cliente: Usuario;

}