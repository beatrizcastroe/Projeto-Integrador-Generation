import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoComponent } from '../contato/contato.component';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  usuario: Usuario = new Usuario
  email: string
  emailNews: string
  mensagem: string

  validEmailNews: boolean = false
  validCaracterEmail: boolean = false

  feedback: boolean = false
  validMensagem: boolean = false
  validCaracter: boolean = false

  constructor(
    private router: Router,
    private alertas: AlertasService

  ) { }



  ngOnInit() {


  }

  contato() {
    this.router.navigate(['/contato'])
  }

  getNewsEmail(event: any) {
    this.email = event.target.value
    if (this.email.length < 1) {
      this.validEmailNews = true;
      // a ValidEmail some após o primeiro caracter
    } else {
      this.validEmailNews = true;
    }
    if (this.email.indexOf('@' && '.') == -1) {
      this.validCaracterEmail = true;
    } else {
      this.validCaracterEmail = false;
    }
  }
  enviar(event: any) {
    if (this.validEmailNews == true && this.validCaracterEmail == false) {
      this.alertas.showAlertSuccess('E-mail cadastrado com sucesso!')
      var resetForm:HTMLFormElement;
resetForm= <HTMLFormElement>document.getElementById('resetF');
if(resetForm)
    resetForm.reset();
    } else {
      this.alertas.showAlertDanger('E-mail inválido, tente novamente')
    }
  }

  getMensagem(event: any) {
    this.mensagem = event.target.value
    if (this.mensagem.length < 1) {
      this.validMensagem = true;
      // a ValidMensagem some após o primeiro caracter
    } else {
      this.validMensagem = true;
    }
    if (this.mensagem.length > 1 && this.mensagem.length < 10) {
      this.validCaracter = true;
    } else {
      this.validCaracter = false;
    }
  }



  enviarModal(){
    if(this.validMensagem == true && this.validEmailNews == true && this.validCaracterEmail == false){
      this.alertas.showAlertSuccess("Agradeçemos o seu feedback!")
      
    }else{
      this.alertas.showAlertDanger ("Por favor, digite seu feedback!")
    }
  }
  
}
