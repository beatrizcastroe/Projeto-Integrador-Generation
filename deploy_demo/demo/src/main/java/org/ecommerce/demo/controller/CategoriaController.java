package org.ecommerce.demo.controller;

import java.util.List;

import javax.validation.Valid;

import org.ecommerce.demo.model.Categoria;
import org.ecommerce.demo.repository.CategoriaRepository;
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
@RequestMapping ("/categorias")
@CrossOrigin ("*")
public class CategoriaController {
	
	@Autowired
	private CategoriaRepository repository;
	
	@GetMapping
	public ResponseEntity<List<Categoria>> FindAll(){
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/id/{idCategoria}")
	public ResponseEntity<Categoria> FindById(@PathVariable Long idCategoria) {
		return repository.findById(idCategoria).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/novacategoria")
	public ResponseEntity<Categoria> PostCategoria(@Valid @RequestBody Categoria categoria){
		return ResponseEntity.ok(repository.save(categoria));
	}
	
	@PutMapping("/atualizarcategoria")
	public ResponseEntity<Categoria> PutCategoria(@Valid @RequestBody Categoria categoria){
		return ResponseEntity.ok(repository.save(categoria));
	}
	
	@DeleteMapping("/deletar/{idCategoria}")
	public void DeleteCategoria(@PathVariable Long idCategoria) {
		repository.deleteById(idCategoria);
	}
}
