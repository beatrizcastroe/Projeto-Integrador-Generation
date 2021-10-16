import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  nome: string;
  sobrenome: string;
  email: string;
  mensagem: string;


  validNome: boolean = false;
  validSobrenome: boolean = false;
  validEmail: boolean = false;
  validMensagem: boolean = false;
  validCaracter: boolean = false;
  validCaracterEmail:boolean = false;

  constructor(
    private alertas: AlertasService
  ) { }

  ngOnInit() {

  }

  getNome(event: any) {
    this.nome = event.target.value
    if (this.nome.length > 3) {
      this.validNome = true;
    }else{
      this.validNome = false;
    }

  }

  getSobrenome(event: any) {
    this.sobrenome = event.target.value
    if (this.sobrenome.length > 3) {
      this.validSobrenome = true;
    }else{
      this.validSobrenome = false;
    }

  }

  getEmail(event: any) {
    this.email = event.target.value
    if (this.email.length < 1) {
      this.validEmail = true;
      // a ValidEmail some após o primeiro caracter
    } else {
      this.validEmail = true;
    }
    if (this.email.indexOf('@')== -1 || this.email.indexOf('.') == -1 || this.email.indexOf('com') == -1 ) {
      this.validCaracterEmail = true;
    } else {
      this.validCaracterEmail = false;
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


  enviar(event: any) {
    if(this.validNome == true && this.validMensagem == true && this.validSobrenome == true && this.validEmail == true){
      this.alertas.showAlertSuccess('Formulário enviado com sucesso!')
  }else{
    this.alertas.showAlertDanger('Por favor, preencha todos os dados corretamente.')
  }
  }
}



