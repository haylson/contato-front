import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoListComponent } from './components/contato/contato-list/contato-list.component';
import { ContatoCreateComponent } from './components/contato/contato-create/contato-create.component';
import { ContatoUpdateComponent } from './components/contato/contato-update/contato-update.component';
import { ContatoDeleteComponent } from './components/contato/contato-delete/contato-delete.component';

const routes: Routes = [
  { 
    path: '', component: NavComponent, children: [
    { path: 'home', component: HomeComponent },

    { path: 'contatos', component: ContatoListComponent },
    { path: 'contatos/create', component: ContatoCreateComponent },
    { path: 'contatos/update/:id', component: ContatoUpdateComponent },
    { path: 'contatos/delete/:id', component: ContatoDeleteComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
