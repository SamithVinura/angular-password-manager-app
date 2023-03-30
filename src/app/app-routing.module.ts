import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordListComponent } from './password-list/password-list.component';
import { SiteListComponent } from './site-list/site-list.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'site-list',component:SiteListComponent,canActivate:[AuthGuard]},
  {path:'password-list',component:PasswordListComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
