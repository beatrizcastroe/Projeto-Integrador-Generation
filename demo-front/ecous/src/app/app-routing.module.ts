import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackEndComponent } from './back-end/back-end.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDeleteComponent } from './delete/categoria-delete/categoria-delete.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  
  
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
