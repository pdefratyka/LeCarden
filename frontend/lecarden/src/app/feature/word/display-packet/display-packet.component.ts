import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { PacketsState, PacketPageAction, getPackets } from '../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-packet',
  templateUrl: './display-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-packet.component.scss',
  ],
})
export class DisplayPacketComponent implements OnInit {
  packets: Packet[];
  packets$: Observable<Packet[]>;
  filteredPackets: Packet[];

  constructor(private store: Store<PacketsState>) {}

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.packets$ = this.store.select(getPackets);
  }

  filterPackets(query: string): void {
    this.store.dispatch(PacketPageAction.loadPackets({ query }));
  }

  deletePacket(packetId: number): void {
    if (window.confirm('Are you sure you want to delete this packet?')) {
      this.store.dispatch(PacketPageAction.deletePacket({ packetId }));
    }
  }
}
