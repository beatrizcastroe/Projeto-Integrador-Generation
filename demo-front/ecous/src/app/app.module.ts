import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { BackEndComponent } from './back-end/back-end.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { ContatoComponent } from './contato/contato.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { LoginBackendComponent } from './login-backend/login-backend.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PagamentoComponent } from './pagamento/pagamento.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    RegisterComponent,
    BackEndComponent,
    CategoriaDeleteComponent,
    ProdutoDeleteComponent,
    CategoriaEditComponent,
    ProdutoEditComponent,
    QuemSomosComponent,
    ContatoComponent,
    ListagemProdutoComponent,
    DetalheProdutoComponent,
    LoginBackendComponent,
    PerfilComponent,
    PedidoComponent,
    AlertasComponent,
    PagamentoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
