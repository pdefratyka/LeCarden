import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast-messge',
  templateUrl: './toast-messge.component.html',
  styleUrls: ['./toast-messge.component.scss']
})
export class ToastMessgeComponent {
  @Input()
  text: string;
  constructor() {}
}
