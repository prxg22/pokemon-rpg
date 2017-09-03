import { Component, OnInit } from '@angular/core';
import { Item, Pokemon } from './pokemon/pokemon.model';
import { PokemonService } from './pokemon/pokemon.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public selected: Pokemon = null;
  private pokemons: Item[] = [];
  private title = 'my fucking  app';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {

  }

  clear() {
    this.selected = null;
  }

  select(pokemon: Pokemon) {
    this.selected = pokemon;
  }
}
