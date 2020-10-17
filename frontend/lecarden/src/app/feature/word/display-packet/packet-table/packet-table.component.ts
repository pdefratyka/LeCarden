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

  constructor() {}

  editPacket(packetId: number): void {
    // TODO Here should be some if statement
    this.updatePacket.emit(this.packets.filter((p) => p.id === packetId)[0]);
  }

  emitDeletePacket(packetId: number): void {
    if (window.confirm('Are you sure you want to delete this packet?')) {
      this.deletePacket.emit(packetId);
    }
  }
}
