import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-basket-mode-selector',
  templateUrl: './basket-mode-selector.component.html',
  styleUrls: ['./basket-mode-selector.component.scss'],
})
export class BasketModeSelectorComponent {
  @Output()
  basketMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  isBasketModeSelected = false;

  emitBasketMode(): void {
    this.isBasketModeSelected = !this.isBasketModeSelected;
    this.basketMode.emit(this.isBasketModeSelected);
  }
}
