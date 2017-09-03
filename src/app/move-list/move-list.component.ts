import { Component, OnInit, Input, ContentChild } from '@angular/core';

import { PokemonService } from '../pokemon/pokemon.service';
import { Move, MoveItem } from '../pokemon/pokemon.model';
import { MoveDetailsComponent } from '../move-details/move-details.component';

@Component({
  selector: 'app-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit {
  public selected: Move;

  @Input()
  public moveItems: MoveItem[];

  @ContentChild(MoveDetailsComponent)
  private moveDetailComponent: MoveDetailsComponent;

  constructor(private pokemonService: PokemonService) {
    this.moveItems = [];
 }

  ngOnInit() {
    this.selected = null;
  }

  selectMove(moveItem: MoveItem) {
    console.log(this.moveDetailComponent);
    this.pokemonService.getMove(moveItem).subscribe((move: Move) => {
      this.selected = move;
    });
  }

  clear() {
    this.selected = null;
  }

}
