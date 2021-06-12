import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-german-keys',
  templateUrl: './german-keys.component.html',
  styleUrls: ['./german-keys.component.scss'],
})
export class GermanKeysComponent {
  keys: string[] = ['ü', 'ä', 'ö', 'ß'];
  @Output()
  keyToInsert: EventEmitter<string> = new EventEmitter<string>();
  isCapitalLetters = false;

  insertKey(key: string): void {
    this.keyToInsert.emit(key);
  }

  changeLettersSize(): void {
    this.isCapitalLetters = !this.isCapitalLetters;
    if (this.isCapitalLetters) {
      for (let i = 0; i < this.keys.length - 1; i++) {
        this.keys[i] = this.keys[i].toUpperCase();
      }
    } else {
      for (let i = 0; i < this.keys.length - 1; i++) {
        this.keys[i] = this.keys[i].toLowerCase();
      }
    }
  }
}
