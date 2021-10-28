package org.ecommerce.demo.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Classe utilizada como entidade no banco de dados para a criação dos produtos e seus atributos.
 * 
 * @author DevTeam
 * @since 1.0
 *
 */

@Entity
@Table(name="tb_produto")
public class Produto {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idProduto;
	
	@NotBlank
	private String nome;
	
	@NotBlank
	@Size(min= 5, max=300)
	private String descricao;
	
	@NotBlank
	private String marca;

	@NotBlank
	private String foto;
	
	
	@NotNull
	private Double preco;
	
	@NotNull
	private int estoque;
	
	private int qtdPedidoProduto;
	
	@ManyToOne
	@JoinColumn(name = "categoria_id")
	@JsonIgnoreProperties({"produto"})
	private Categoria categoriaRelacionada;
	
	/*@ManyToOne
	@JoinColumn(name = "usuario_id")
	@JsonIgnoreProperties({"produto"})
	private Usuario usuarioRelacionado;*/
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(
	  name = "produto_pedido",
	  joinColumns = @JoinColumn(name = "produto_id"),
	  inverseJoinColumns = @JoinColumn(name = "pedido_id")
	)
	@JsonIgnoreProperties({"data", "valorTotal", "produtos", "cliente", "qtdProduto"})
	private List<Pedido> pedidos = new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(
	  name = "produto_lista",
	  joinColumns = @JoinColumn(name = "produto_id"),
	  inverseJoinColumns = @JoinColumn(name = "lista_id")
	)
	@JsonIgnoreProperties({"produtos", "cliente"})
	private List<ListaDeDesejos> listaDesejos = new ArrayList<>();
	
	
	public List<ListaDeDesejos> getListaDesejos() {
		return listaDesejos;
	}

	public void setListaDesejos(List<ListaDeDesejos> listaDesejos) {
		this.listaDesejos = listaDesejos;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	public Long getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(Long idProduto) {
		this.idProduto = idProduto;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Categoria getCategoriaRelacionada() {
		return categoriaRelacionada;
	}

	public void setCategoriaRelacionada(Categoria categoriaRelacionada) {
		this.categoriaRelacionada = categoriaRelacionada;
	}

	/*public Usuario getUsuarioRelacionado() {
		return usuarioRelacionado;
	}

	public void setUsuarioRelacionado(Usuario usuarioRelacionado) {
		this.usuarioRelacionado = usuarioRelacionado;
	}*/

	public int getEstoque() {
		return estoque;
	}

	public void setEstoque(int estoque) {
		this.estoque = estoque;
	}

	public int getQtdPedidoProduto() {
		return qtdPedidoProduto;
	}

	public void setQtdPedidoProduto(int qtdPedidoProduto) {
		this.qtdPedidoProduto = qtdPedidoProduto;
	}	
	
	
}
