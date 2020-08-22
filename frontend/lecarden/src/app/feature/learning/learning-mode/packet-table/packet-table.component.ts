import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';

@Component({
  selector: 'app-packet-table',
  templateUrl: './packet-table.component.html',
  styleUrls: ['./packet-table.component.scss'],
})
export class PacketTableComponent {
  @Input()
  packets: Packet[];
  @Input()
  selectedPacket: number;
  @Output()
  selectPacket: EventEmitter<number> = new EventEmitter<number>();

  emitSelectPacket(packetId: number): void {
    this.selectPacket.emit(packetId);
  }
}
