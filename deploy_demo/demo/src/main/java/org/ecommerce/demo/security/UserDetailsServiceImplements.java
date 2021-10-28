package org.ecommerce.demo.security;

import java.util.Optional;

import org.ecommerce.demo.model.Usuario;
import org.ecommerce.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImplements implements UserDetailsService {

	
	@Autowired
	private UsuarioRepository repositorio;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Optional<Usuario> usuario = repositorio.findByEmail(email);
		if(usuario.isPresent()) {
			return new UserDetailsImplements(usuario.get());
		}else {
			throw new UsernameNotFoundException(email + " Não existe!");
		}
	}
	
}
