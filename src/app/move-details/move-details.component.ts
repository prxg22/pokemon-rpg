import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Move, POWER_SCALE, ACC_SCALE } from '../pokemon/pokemon.model';
@Component({
  selector: 'app-move-details',
  templateUrl: './move-details.component.html',
  styleUrls: ['./move-details.component.css']
})
export class MoveDetailsComponent implements OnInit {
  @Input()
  public move: Move;

  @Output()
  public onClear: EventEmitter<any> = new EventEmitter<any>();

  private power: number;
  private acc: number;

  constructor() { }

  ngOnInit() {
    if (!this.move) {
      this.clear();
      return;
    }

    this.power = this.move.power * POWER_SCALE;
    this.acc = this.move.acc * ACC_SCALE;
  }

  clear() {
    this.onClear.emit();
  }

}
