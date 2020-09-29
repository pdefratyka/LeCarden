import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Language } from 'src/app/shared/models/language';

@Component({
  selector: 'app-packet-name',
  templateUrl: './packet-name.component.html',
  styleUrls: ['./packet-name.component.scss'],
})
export class PacketNameComponent implements OnInit {
  @Input()
  name: FormGroup;
  @Input()
  packetName: string;
  @Input()
  languages: Language[];

  ngOnInit(): void {
    this.name.get('packetName').setValue(this.packetName);
  }
}
