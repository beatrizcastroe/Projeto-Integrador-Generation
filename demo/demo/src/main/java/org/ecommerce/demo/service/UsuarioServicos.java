package org.ecommerce.demo.service;

import org.apache.commons.codec.binary.Base64;
import org.ecommerce.demo.model.Usuario;
import org.ecommerce.demo.model.UsuarioLogin;
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

				usuarioParaAutenticar.setToken(autorizacaoHeader);
				usuarioParaAutenticar.setNome(usuarioExistente.getNome());
				usuarioParaAutenticar.setSenha(usuarioExistente.getSenha());
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
			usuarioExistente.setSenha(senhaCriptografada);
			return Optional.ofNullable(repositorio.save(usuarioExistente));
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}
}
