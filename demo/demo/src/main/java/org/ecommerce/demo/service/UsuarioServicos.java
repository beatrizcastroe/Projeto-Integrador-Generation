package org.ecommerce.demo.service;

import org.ecommerce.demo.model.Usuario;
import org.ecommerce.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioServicos {

    @Autowired
    UsuarioRepository repositorio;

    public Optional <Object> cadastrarUsuario (Usuario novoUsuario){
        return repositorio.findByEmail(novoUsuario.getEmail()).map(usuarioExistente -> {
           return Optional.empty();
        }).orElseGet((()->{
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String resultado = encoder.encode(novoUsuario.getSenha());
            novoUsuario.setSenha(resultado);
            return Optional.ofNullable(repositorio.save(novoUsuario));
        }));
    }
}
