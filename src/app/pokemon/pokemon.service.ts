import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Item, Resource, MoveItem, Move } from './pokemon.model';

@Injectable()
export class PokemonService {
  private readonly api = 'http://pokeapi.co/api/v2/';
  private readonly pokemonUrl= this.api + 'pokemon/';
  private readonly moveUrl= this.api + 'move/';
  
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get(this.pokemonUrl + '?limit=150');
  }

  getMove(moveItem: MoveItem): Observable<Move> {
    return this.http.get(moveItem.move.url)
      .map(move => new Move(moveItem, move));
  }

  get<T>(item: Item): Observable<T> {
    return this.http.get(item.url).map(i => <T> i);
  }
}
