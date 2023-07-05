import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos', component: TecnicoListComponent },
      { path: 'tecnicos/create', component: TecnicoCreateComponent },
      { path: 'tecnicos/create/:id', component: TecnicoCreateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/create/:id', component: ClienteCreateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'chamados', component: ChamadoListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
