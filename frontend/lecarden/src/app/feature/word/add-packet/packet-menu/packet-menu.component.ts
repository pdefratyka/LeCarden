import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/shared/models/word';

@Component({
  selector: 'app-packet-menu',
  templateUrl: './packet-menu.component.html',
  styleUrls: [
    './../../../../shared/styles/global.scss',
    './packet-menu.component.scss'
  ]
})
export class PacketMenuComponent implements OnInit {
  @Input()
  wordsInPacket: Word[];

  constructor() {}

  ngOnInit() {}
}
