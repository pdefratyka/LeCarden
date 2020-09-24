import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-basket-mode-selector',
  templateUrl: './basket-mode-selector.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './basket-mode-selector.component.scss',
  ],
})
export class BasketModeSelectorComponent {
  @Output()
  basketMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  isBasketModeSelected = false;

  emitBasketMode(): void {
    this.basketMode.emit(this.isBasketModeSelected);
  }
}
