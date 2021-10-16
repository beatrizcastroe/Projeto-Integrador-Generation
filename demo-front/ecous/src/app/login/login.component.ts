import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UsuarioLogin = new UsuarioLogin()
  tokenUsuario: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }
  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UsuarioLogin) => {
      this.userLogin = resp

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.idUsuario = this.userLogin.idUsuario;
      environment.pedidos = this.userLogin.pedidos.id;
      environment.listaDeDesejos = this.userLogin.listaDeDesejos.id;

      console.log(environment.token);
      console.log(environment.idUsuario);
      console.log("Pedido ID: "+ environment.pedidos);
      console.log("Lista de Desejos ID: "+ environment.listaDeDesejos);
      
      /* ARMAZENA O TOKEN DO USUARIO NA VARIAVEL */
      this.tokenUsuario = this.userLogin.token;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', this.tokenUsuario);

      this.router.navigate(['/perfil'])
    }, erro =>{
      if(erro.status == 400){
        this.alertas.showAlertDanger('Usuário e/ou senha incorretos.')
      }
    })
  }
}
