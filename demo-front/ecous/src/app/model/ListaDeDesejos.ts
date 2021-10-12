
import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export class ListaDeDesejos {
  public id: number;
  public cliente: Usuario;
  public produtos: Produto[];

}