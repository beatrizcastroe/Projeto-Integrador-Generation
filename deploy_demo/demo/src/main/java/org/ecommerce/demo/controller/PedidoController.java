package org.ecommerce.demo.controller;


import java.util.List;
import java.util.Optional;

import org.ecommerce.demo.model.Pedido;
import org.ecommerce.demo.model.Produto;
import org.ecommerce.demo.repository.PedidoRepository;
import org.ecommerce.demo.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PedidoController {
	
	@Autowired
	private PedidoRepository repository;
	
	@Autowired
	private ProdutoService service;
	
	@GetMapping
	public ResponseEntity<List<Pedido>> findAllByPedidos() {
		
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Pedido> findByIdPedido(@PathVariable long id) {
		
		return repository.findById(id)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/meuspedidos/{idPedido}")
	public ResponseEntity<List<Produto>> findAllByProdutosListaDeDesejos(@PathVariable long idPedido) {
		
		return ResponseEntity.ok(service.pesquisaPorProdutoNoCarrinho(idPedido));
	}
	
	@PostMapping
	public ResponseEntity<Pedido> postPedido(@RequestBody Pedido pedido) {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(pedido));
	}
	
	@PutMapping
	public ResponseEntity<Pedido> putPedido(@RequestBody Pedido pedido) {
		
		return ResponseEntity.ok(repository.save(pedido));
	}
	
	@DeleteMapping("/{id}")
	public void deletePedido(@PathVariable long id) {
		
		repository.deleteById(id);
	}
	
	@PutMapping("/produto_pedido/produtos/{idProduto}/pedidos/{idPedido}")
	public void putProduto(@PathVariable long idProduto, @PathVariable long idPedido) {
		
		service.deletarProduto(idProduto, idPedido);
	}
	
	@DeleteMapping("/produto_pedido/produtos/{idProduto}/pedidos/{idPedido}")
	public void deleteProduto(@PathVariable long idProduto, @PathVariable long idPedido) {
		
		service.deletarProduto(idProduto, idPedido);
	}
	
	/*@PostMapping("/produto_pedido/limpa-carrinho/{idPedido}")
	public ResponseEntity<Pedido> limpaCarrinho(@PathVariable(value = "idPedido") Long idPedido){
		Optional<Pedido> statusVenda = repository.findById(idPedido);
		if(statusVenda.isPresent()) {

			statusVenda.get().getProdutos().clear();
			statusVenda.get().setValorTotal(0);
			return ResponseEntity.ok().body(repository.save(statusVenda.get()));

		}else {
			return ResponseEntity.badRequest().build();
		}*/
		
		
	}
	
	

