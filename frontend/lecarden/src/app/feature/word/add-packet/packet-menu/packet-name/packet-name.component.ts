import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-packet-name',
  templateUrl: './packet-name.component.html',
  styleUrls: ['./packet-name.component.scss']
})
export class PacketNameComponent implements OnInit {
  @Input()
  name: FormGroup;
  @Input()
  packetName: string;
  constructor() {}

  ngOnInit(): void {
    console.log(this.name);
    this.name.get('packetName').setValue(this.packetName);
  }
}
