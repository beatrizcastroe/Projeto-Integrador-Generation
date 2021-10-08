import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackEndComponent } from './back-end/back-end.component';
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
  {path: 'backend', component:BackEndComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
