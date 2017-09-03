import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { Move, MoveItem } from '../pokemon/pokemon.model';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit {
  public selected: Move;

  @Input()
  public moveItems: MoveItem[];

  constructor(private pokemonService: PokemonService) {
    this.moveItems = [];
 }

  ngOnInit() {
    this.selected = null;
  }

  selectMove(moveItem: MoveItem) {
    this.pokemonService.getMove(moveItem).subscribe((move: Move) => {
      this.selected = move;
    });
  }

  clear() {
    this.selected = null;
  }

}
