import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {
  wordsClicked: boolean;
  constructor() {}

  ngOnInit() {
    this.wordsClicked = false;
  }

  changeSubcategory(category: string): void {
    if (category === 'Words') {
      this.wordsClicked = !this.wordsClicked;
    }
  }
}
