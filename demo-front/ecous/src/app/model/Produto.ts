import { Usuario } from "./Usuario"
import { Categoria } from "./Categoria"

export class Produto {

    public idProduto: number
    public nome: string
    public marca: string
    public preco: number
    public descricao: string
    public usuarioRelacionado: Usuario
    public categoriaRelacionada: Categoria
}


