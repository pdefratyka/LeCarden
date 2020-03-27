import { Component, Input } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packet-table',
  templateUrl: './packet-table.component.html',
  styleUrls: ['./packet-table.component.scss']
})
export class PacketTableComponent {
  @Input()
  packets: Packet[];
  constructor(private readonly router: Router) {}

  editPacket(packetId: number): void {
    this.router.navigate(['/add-packet/' + packetId]);
  }
}
