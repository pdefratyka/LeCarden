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
  @Input()
  basketNumber: number;
  @Input()
  selectedBasket: number;
  @Output()
  currentBasket: EventEmitter<Basket> = new EventEmitter<Basket>();
  constructor() {}

  ngOnInit(): void {}

  emitBasketNumber(): void {
    if (!this.basket) {
      this.currentBasket.emit({ number: this.basketNumber } as Basket);
    } else {
      this.currentBasket.emit(this.basket);
    }
  }
}
