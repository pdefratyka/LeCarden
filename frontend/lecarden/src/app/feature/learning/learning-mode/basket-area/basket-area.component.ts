import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket-area',
  templateUrl: './basket-area.component.html',
  styleUrls: ['./basket-area.component.scss'],
})
export class BasketAreaComponent implements OnInit {
  @Input()
  baskets: Basket[];

  @Output()
  basketModeNumber = new EventEmitter<Basket>();

  selectedBasket: number;
  constructor() {}

  ngOnInit(): void {}

  filterBasket(basketNumber: number): Basket {
    return this.baskets.find((b) => b.number === basketNumber);
  }

  emitBasketModeNumber(basket: Basket): void {
    if (this.selectedBasket === basket.number) {
      this.selectedBasket = 0;
      this.basketModeNumber.emit(null);
    } else {
      this.selectedBasket = basket.number;
      this.basketModeNumber.emit(basket);
    }
  }
}
