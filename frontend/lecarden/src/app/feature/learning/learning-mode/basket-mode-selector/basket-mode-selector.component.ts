import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket-mode-selector',
  templateUrl: './basket-mode-selector.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './basket-mode-selector.component.scss',
  ],
})
export class BasketModeSelectorComponent {
  @Input()
  isBasketModeSelected = false;
  @Input()
  baskets: Basket[];
  @Output()
  selectedBasket = new EventEmitter<Basket>();
  @Output()
  resetBaskets = new EventEmitter<void>();
  @Output()
  basketMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedBasketNumber: number;

  emitBasketMode(): void {
    this.basketMode.emit(this.isBasketModeSelected);
  }

  emitSelectedBasket(basketNumber: number): void {
    if (this.selectedBasketNumber === basketNumber) {
      this.selectedBasketNumber = 0;
      this.selectedBasket.emit(null);
    } else {
      this.selectedBasketNumber = basketNumber;
      const basket = this.baskets.find((b) => b.number === basketNumber);
      if (basket) {
        this.selectedBasket.emit(basket);
      } else {
        this.selectedBasket.emit({ number: basketNumber } as Basket);
      }
    }
  }

  filterBasket(basketNumber: number): Basket {
    return this.baskets.find((b) => b.number === basketNumber);
  }

  emitResetBaskets(): void {
    this.resetBaskets.emit();
  }
}
