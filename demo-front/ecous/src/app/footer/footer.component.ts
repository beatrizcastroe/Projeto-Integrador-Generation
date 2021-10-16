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

  validEmailNews:boolean = true;

  constructor(
    private router: Router,
    private alertas: AlertasService

  ) { }

  

  ngOnInit() {

  
  }

  contato(){
        this.router.navigate(['/contato'])
      }
  



getNewsEmail(event: any) {
  this.emailNews = event.target.value;
  
  if (this.emailNews.indexOf('@')== -1 || this.emailNews.indexOf('.') == -1 || this.emailNews.indexOf('com') == -1 ) {
    this.validEmailNews = false;
     
  } else {
    this.validEmailNews = true;
    
    
  }
}
enviar(event:any){
  if(this.validEmailNews==true ){
    this.alertas.showAlertSuccess("Email cadastrado com sucesso")
  }else{
    this.alertas.showAlertDanger ("Email invalido")
  }

  

}
}
