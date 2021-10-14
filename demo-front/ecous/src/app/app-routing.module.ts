import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackEndComponent } from './back-end/back-end.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContatoComponent } from './contato/contato.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListagemProdutoComponent } from './listagem-produto/listagem-produto.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { RegisterComponent } from './register/register.component';
import { DetalheProdutoComponent } from './detalhe-produto/detalhe-produto.component';
import { LoginBackendComponent } from './login-backend/login-backend.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PedidoComponent } from './pedido/pedido.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  
  
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'menu', component:MenuComponent},
  {path:'footer', component:FooterComponent},
  {path:'home', component:HomeComponent},
  {path: 'backend', component:BackEndComponent},
  {path:'categoria', component: CategoriaComponent},
  {path: 'categoria-edit/:id', component:CategoriaEditComponent},
  {path: 'categoria-delete/:id', component:CategoriaDeleteComponent},
  {path: 'produto-edit/:id',component:ProdutoEditComponent},
  {path: 'produto-delete/:id',component:ProdutoDeleteComponent},
  {path: 'quemsomos', component: QuemSomosComponent},
  {path: 'contato',component:ContatoComponent},
  {path: 'produtos', component: ListagemProdutoComponent},
  {path: 'produto/:id', component: DetalheProdutoComponent},
  {path: 'login-backend', component: LoginBackendComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'pedido', component: PedidoComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
