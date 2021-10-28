package org.ecommerce.demo.repository;

import java.util.List;
import java.util.Optional;

import org.ecommerce.demo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	/**
     * Método utilizado para pesquisar coluna nome ContainigIgnoreCase
     * 
     * @param nome do tipo String
     * @return List de Usuarios
     * @author G1
     * @since 1.0
     * 
     */
	
	public List<Usuario> findAllByNomeContainingIgnoreCase(String nome);
	
	/**
     * Método utilizado para pesquisar coluna email
     * 
     * @param email do tipo String
     * @return Optional com Usuario
     * @author G1
     * @since 1.0
     * 
     */
	
	Optional<Usuario> findByEmail(String email);

}
