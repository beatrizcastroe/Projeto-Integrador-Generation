package org.ecommerce.demo.model;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@Table (name = "tb_usuario")
public class Usuario  {
	

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long idUsuario;
	
	
	@NotBlank
	private String nome;
	
	@Email
	private String email;
	
	@NotBlank
	private String senha;
	
	/*
	@CPF
	private String cpf;
	
	@Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
	private Date dataNasc;
	
	@NotBlank
	private String endereco;
	
	private String complemento;
	
	@NotBlank
	private String cep;
	
	@NotBlank
	private String cidade;
	
	@NotBlank
	private String estado;
	
	@NotBlank
	private String tipoUsuario;*/

	@OneToMany(mappedBy = "usuarioRelacionado",cascade=CascadeType.REMOVE)
	@JsonIgnoreProperties({"usuarioRelacionado"})
	private List <Produto> produto=new ArrayList<>();

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public List<Produto> getProduto() {
		return produto;
	}

	public void setProduto(List<Produto> produto) {
		this.produto = produto;
	}
}
