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
  @Output()
  deletePacket: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  updatePacket: EventEmitter<Packet> = new EventEmitter<Packet>();

  editPacket(packet: Packet): void {
    this.updatePacket.emit(packet);
  }

  emitDeletePacket(packet: Packet): void {
    if (
      window.confirm(`Are you sure you want to delete packet: ${packet.name}?`)
    ) {
      this.deletePacket.emit(packet.id);
    }
  }
}
