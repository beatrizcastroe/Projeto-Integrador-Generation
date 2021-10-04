import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Usuario = new Usuario
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  cadastrar() {
    console.log("user"+JSON.stringify(this.user))
    console.log("confirmarSenha"+ this.confirmarSenha)
 
    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas.')
    }
    else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) =>{
        this.user = resp 
        this.router.navigate(['/login'])
        alert('Usuário cadastrado com sucesso')
      })

    }
  }
}
