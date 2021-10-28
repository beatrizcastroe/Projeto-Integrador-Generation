package org.ecommerce.demo.service;

import org.apache.commons.codec.binary.Base64;
import org.ecommerce.demo.model.ListaDeDesejos;
import org.ecommerce.demo.model.Pedido;
import org.ecommerce.demo.model.Usuario;
import org.ecommerce.demo.model.UsuarioLogin;
import org.ecommerce.demo.repository.ListaDeDesejosRepository;
import org.ecommerce.demo.repository.PedidoRepository;
import org.ecommerce.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.Optional;

@Service
public class UsuarioServicos {

	@Autowired
	UsuarioRepository repositorio;
	
	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private ListaDeDesejosRepository listaDeDesejosRepository;
	
	/* CADASTRAR USUARIO NO SISTEMA */
	public Optional<Usuario> cadastrarCliente(Usuario cliente) {	

		if(repositorio.findByEmail(cliente.getEmail()).isPresent() && cliente.getIdUsuario() == 0) {
			return null;
			
		}
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		String senhaEncoder = encoder.encode(cliente.getSenha());
		cliente.setSenha(senhaEncoder);
		
		/*GERANDO CARRINHO USUARIO*/
		/* INSTANCIA UM NOVO CARRINHO 'Pedido' */
		Pedido pedido = new Pedido();
		
		/*GERANDO LISTA DE DESEJOS USUARIO*/
		/* INSTANCIA UMA NOVA LISTA DE DESEJOS 'listaDeDesejos' */
		ListaDeDesejos listaDeDesejos = new ListaDeDesejos();
		
		/* REGISTRA O USUARIO NA BASE DE DADOS */
		repositorio.save(cliente);
		
		/* ASSOCIA O USUARIO AO CARRINHO */
		pedido.setCliente(cliente);
		
		/* ASSOCIA O USUARIO AO LISTA DE DESEJOS */
		listaDeDesejos.setCliente(cliente);
		
		/* REGISTRA O CARRINHO NA BASE DE DADOS */
		pedidoRepository.save(pedido);
		
		/* REGISTRA A LISTA DE DESEJOS NA BASE DE DADOS */
		listaDeDesejosRepository.save(listaDeDesejos);

		return Optional.of(repositorio.save(cliente));

	}

	public Optional<Object> cadastrarUsuario(Usuario novoUsuario) {
		return repositorio.findByEmail(novoUsuario.getEmail()).map(usuarioExistente -> {
			return Optional.empty();
		}).orElseGet((() -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String resultado = encoder.encode(novoUsuario.getSenha());
			novoUsuario.setSenha(resultado);
			return Optional.ofNullable(repositorio.save(novoUsuario));
		}));
	}

	public Optional<?> Login(UsuarioLogin usuarioParaAutenticar) {
		return repositorio.findByEmail(usuarioParaAutenticar.getEmail()).map(usuarioExistente -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

			if (encoder.matches(usuarioParaAutenticar.getSenha(), usuarioExistente.getSenha())) {

				String estruturaBasic = usuarioParaAutenticar.getEmail() + ":" + usuarioParaAutenticar.getSenha();
				byte[] autorizacaoBase64 = Base64.encodeBase64(estruturaBasic.getBytes(Charset.forName("US-ASCII")));
				String autorizacaoHeader = "Basic " + new String(autorizacaoBase64);

				usuarioParaAutenticar.setIdUsuario(usuarioExistente.getIdUsuario());
				usuarioParaAutenticar.setToken(autorizacaoHeader);
				usuarioParaAutenticar.setNome(usuarioExistente.getNome());
				usuarioParaAutenticar.setFoto(usuarioExistente.getFoto());
				usuarioParaAutenticar.setEmail(usuarioExistente.getEmail());
				usuarioParaAutenticar.setSenha(usuarioExistente.getSenha());
				usuarioParaAutenticar.setRua(usuarioExistente.getRua());
				usuarioParaAutenticar.setBairro(usuarioExistente.getBairro());
				usuarioParaAutenticar.setNumero(usuarioExistente.getNumero());
				usuarioParaAutenticar.setComplemento(usuarioExistente.getComplemento());
				usuarioParaAutenticar.setCep(usuarioExistente.getCep());
				usuarioParaAutenticar.setCidade(usuarioExistente.getCidade());
				usuarioParaAutenticar.setEstado(usuarioExistente.getEstado());
				usuarioParaAutenticar.setTipoUsuario(usuarioExistente.getTipoUsuario());
				usuarioParaAutenticar.setPedidos(usuarioExistente.getPedidos());
				usuarioParaAutenticar.setListaDeDesejos(usuarioExistente.getListaDeDesejos());
				return Optional.ofNullable(usuarioParaAutenticar);

			} else {
				return Optional.empty();
			}

		}).orElseGet(() -> {
			return Optional.empty(); //
		});
	}

	public Optional<?> alterarUsuario(UsuarioLogin usuarioParaAlterar) {
		return repositorio.findById(usuarioParaAlterar.getIdUsuario()).map(usuarioExistente -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String senhaCriptografada = encoder.encode(usuarioParaAlterar.getSenha());

			usuarioExistente.setNome(usuarioParaAlterar.getNome());
			usuarioExistente.setFoto(usuarioParaAlterar.getFoto());
			usuarioExistente.setEmail(usuarioParaAlterar.getEmail());
			usuarioExistente.setRua(usuarioParaAlterar.getRua());
			usuarioExistente.setBairro(usuarioParaAlterar.getBairro());
			usuarioExistente.setNumero(usuarioParaAlterar.getNumero());
			usuarioExistente.setComplemento(usuarioParaAlterar.getComplemento());
			usuarioExistente.setCep(usuarioParaAlterar.getCep());
			usuarioExistente.setCidade(usuarioParaAlterar.getCidade());
			usuarioExistente.setEstado(usuarioParaAlterar.getEstado());
			usuarioExistente.setTipoUsuario(usuarioParaAlterar.getTipoUsuario());
			
			
			
			usuarioExistente.setSenha(senhaCriptografada);
			return Optional.ofNullable(repositorio.save(usuarioExistente));
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}
}
