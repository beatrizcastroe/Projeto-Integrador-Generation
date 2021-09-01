package org.ecommerce.demo.repository;

import org.ecommerce.demo.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
