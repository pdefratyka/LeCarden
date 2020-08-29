import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  @Input()
  basket: Basket;
  @Output()
  basketNumber: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  emitBasketNumber(): void {
    this.basketNumber.emit(1);
  }
}
