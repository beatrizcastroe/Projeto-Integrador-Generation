package org.ecommerce.demo.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.ecommerce.demo.model.Usuario;
import org.ecommerce.demo.model.UsuarioLogin;
import org.ecommerce.demo.repository.UsuarioRepository;
import org.ecommerce.demo.service.UsuarioServicos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	private UsuarioServicos servicos;
	
	@GetMapping
	public ResponseEntity<List<Usuario>> findAllUsuario (){
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/idusuario/{idUsuario}")
	public ResponseEntity<Usuario> FindByIdUsua (@PathVariable Long idUsuario){
		return repository.findById(idUsuario).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/nomeusuario/{nome}")
	public ResponseEntity<List<Usuario>> FindByDescricaoProd (@PathVariable String nome){
		return ResponseEntity.ok(repository.findAllByNomeContainingIgnoreCase(nome));
	}
	
	@PostMapping("/novousuario")
	public ResponseEntity<Object> novoUsuario (@Valid @RequestBody Usuario novoUsuario){
		Optional<Object> objetoOptional = servicos.cadastrarUsuario(novoUsuario);
		
		if (objetoOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(201).body(objetoOptional.get());
		}
	}
	
	@PutMapping("/login")
	public ResponseEntity<Object> login (@Valid @RequestBody UsuarioLogin usuarioParaAutenticar){
		Optional<?> objetoOptional = servicos.Login(usuarioParaAutenticar);
		
		if (objetoOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(201).body(objetoOptional.get());
		}
	} 
	
	@PutMapping("/atualizarusuario")
	public ResponseEntity<Usuario> putUsuario (@Valid @RequestBody Usuario usuario){
		return ResponseEntity.ok(repository.save(usuario));
	}
	
	@DeleteMapping("/deletarusuario/{idUsuario}")
	public void Deletar (@PathVariable Long idUsuario) {
		repository.deleteById(idUsuario);
	}
}
