import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { PacketsState, PacketPageAction, getPackets } from '../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TabName } from '../../home/models/tabName';
import { TabSerivce } from 'src/app/core/services/helpers/tab.service';

@Component({
  selector: 'app-display-packet',
  templateUrl: './display-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-packet.component.scss',
  ],
})
export class DisplayPacketComponent implements OnInit {
  packets$: Observable<Packet[]>;
  filteredPackets: Packet[];

  constructor(
    private store: Store<PacketsState>,
    private readonly tabService: TabSerivce
  ) {
    this.packets$ = this.store.select(getPackets);
    this.tabService.setCurrentTab(TabName.DISPLAY_PACKETS);
  }

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
  }

  filterPackets(query: string): void {
    this.store.dispatch(PacketPageAction.loadPackets({ query }));
  }

  deletePacket(packetId: number): void {
    this.store.dispatch(PacketPageAction.deletePacket({ packetId }));
  }

  updatePacket(packet: Packet): void {
    this.store.dispatch(PacketPageAction.updatePacket({ packet }));
  }
}
