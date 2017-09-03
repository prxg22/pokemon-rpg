import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import { MoveListComponent } from '../move-list/move-list.component';
import { Pokemon } from '../pokemon/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnChanges {
  @Input()
  pokemon: Pokemon;

  @Output()
  onClear: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('moveComponent')
  moveComponent: MoveListComponent;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pokemon && 
        changes.pokemon.previousValue !== changes.pokemon.currentValue) {
      this.moveComponent.clear();
    }
  }

  clear() {
    this.moveComponent.clear();
    this.onClear.emit();
  }

}
