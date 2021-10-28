package org.ecommerce.demo.controller;

import java.util.List;

import javax.validation.Valid;

import org.ecommerce.demo.model.Produto;
import org.ecommerce.demo.repository.ProdutoRepository;
import org.ecommerce.demo.service.ProdutoService;
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
@RequestMapping("/produtos")
@CrossOrigin("*")
public class ProdutoController {
	
	@Autowired
	private ProdutoRepository repository;
	
	@Autowired
	private ProdutoService service;
	
	@GetMapping
	public ResponseEntity<List<Produto>> findAllProdutos (){
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/idproduto/{idProduto}")
	public ResponseEntity<Produto> FindByIdProd (@PathVariable Long idProduto){
		return repository.findById(idProduto).map(resp -> ResponseEntity.ok(resp)).orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/nomeproduto/{nome}")
	public ResponseEntity<List<Produto>> FindByNomeProd (@PathVariable String nome){
		return ResponseEntity.ok(repository.findAllByNomeContainingIgnoreCase(nome));
	}
	
	@PostMapping("/novoproduto")
	public ResponseEntity<Produto> postProduto (@Valid @RequestBody Produto produto){
		return ResponseEntity.ok(repository.save(produto));
	}
	
	@PutMapping("/atualizarproduto")
	public ResponseEntity<Produto> putProduto (@RequestBody Produto produto){
		return ResponseEntity.ok(repository.save(produto));
	}
	
	@PutMapping("/produto_pedido/produtos/{idProduto}/pedidos/{idPedido}")
	public ResponseEntity<Produto> putProduto(@PathVariable long idProduto, @PathVariable long idPedido/*, @PathVariable int qtdProduto*/) {
		
		return ResponseEntity.ok(service.compraProduto(idProduto, idPedido/*, qtdProduto*/));
	}
	
	@PutMapping("/produto_lista/produtos/{idProduto}/listaDesejos/{idListaDeDesejo}")
	public ResponseEntity<Produto> adicionaProdutoListaDeDesejos(@PathVariable long idProduto, @PathVariable long idListaDeDesejo) {
		
		return ResponseEntity.ok(service.adicionarProdutoListaDeDesejo(idProduto, idListaDeDesejo));
	}
	
	@DeleteMapping("/deletarproduto/{idProduto}")
	public void Deletar (@PathVariable Long idProduto) {
		repository.deleteById(idProduto);
	}
}

