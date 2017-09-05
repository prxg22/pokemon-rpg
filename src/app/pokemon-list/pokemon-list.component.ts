import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { Item, Resource, Pokemon } from '../pokemon/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  public query: string;
  public items: Item[] = [];
  private original: Item[] = [];

  @Output()
  public onPokemonSelected: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  @Input()
  public open: boolean = true;
  @Input()
  public selected: Pokemon;

  constructor(private pokemonService: PokemonService) { }


  ngOnInit() {
    setTimeout(() => this.pokemonService.all().subscribe((items: any) => {
      this.items = items.results.map(item => new Item(item));
      this.original = this.items;
    }), 0);
  }

  ngAfterViewInit() {

  }

  getPokemon(item: Item) {
    this.pokemonService.get<Pokemon>(item).subscribe((pokemon: Pokemon) => {
      this.onPokemonSelected.emit(new Pokemon(pokemon));
    });
  }

  search(event: any) {
    this.query = event.target.value;
    if (!this.query) {
      this.items = this.original;
      return;
    }

    let regex: RegExp = new RegExp(`${this.query.toLowerCase()}`);
    this.items = this.original.filter(item => regex.test(item.name.toLowerCase()));
  }

  pad(name: string) { 
    let x = this.original.findIndex((item: Item) => item.name === name) + 1;
    return String("00" + x).slice(-3); 
  }

  isActive(item: Item): boolean {
    if (this.selected) {
      return item.name === this.selected.name;
    }
    return false;
  }

}
