import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-packet-name',
  templateUrl: './packet-name.component.html',
  styleUrls: ['./packet-name.component.scss']
})
export class PacketNameComponent {
  @Input()
  name: FormGroup;
  constructor() {}
}
