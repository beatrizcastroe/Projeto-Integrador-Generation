import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoComponent } from '../contato/contato.component';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  usuario: Usuario = new Usuario
  email: string

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  
  }

  contato(){
        this.router.navigate(['/contato'])
      }
  

}
