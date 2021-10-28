package org.ecommerce.demo.repository;



import org.ecommerce.demo.model.ListaDeDesejos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ListaDeDesejosRepository extends JpaRepository<ListaDeDesejos, Long> {
	
	//public List<ListaDeDesejos> findAllByProdutosContainingIgnoreCase(long id);

}
