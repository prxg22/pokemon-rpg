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
  public query: string;

  @Input()
  public moveItems: MoveItem[];
  public original: MoveItem[];

  @ContentChild(MoveDetailsComponent)
  private moveDetailComponent: MoveDetailsComponent;

  constructor(private pokemonService: PokemonService) {
    this.moveItems = [];
 }

  ngOnInit() {
    this.selected = null;
    this.original = this.moveItems;
  }

  selectMove(moveItem: MoveItem) {
    this.pokemonService.getMove(moveItem).subscribe((move: Move) => {
      this.selected = move;
    });
  }

  clear() {
    this.selected = null;
  }

  search(event: any) {
    this.query = event.target.value;
    if (!this.query) {
      this.moveItems = this.original;
      return;
    }

    let regex: RegExp = new RegExp(`${this.query.toLowerCase()}`);
    this.moveItems = this.original.filter(moveItem => regex.test(moveItem.move.name.toLowerCase()));
  }

  getDataIndex(move: MoveItem): string {
    return move.learn_method === 'machine' ? 'TM or HM' : `LVL ${move.lvl}`;
  }

}
