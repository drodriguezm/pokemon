import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListPokemonsComponent },
  { path: 'pokemon', component: ListPokemonsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
