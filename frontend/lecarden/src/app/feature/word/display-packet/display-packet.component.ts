import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { FilterService } from 'src/app/core/services/helpers/filter.service';
import { PacketService } from 'src/app/core/services/api/packet.service';

@Component({
  selector: 'app-display-packet',
  templateUrl: './display-packet.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './display-packet.component.scss'
  ]
})
export class DisplayPacketComponent implements OnInit {
  packets: Packet[];
  filteredPackets: Packet[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly filterService: FilterService,
    private readonly packetService: PacketService
  ) {}

  ngOnInit() {
    this.getPacketsFromResolver();
  }

  filterPackets(filter: string): void {
    this.filteredPackets = this.filterService.filterPackets(
      this.packets,
      filter
    );
  }

  deletePacket(packetId: number): void {
    if (window.confirm('Are you sure you want to delete this packet?')) {
      this.packetService
        .deletePacketById(packetId)
        .pipe(take(1))
        .subscribe(() => this.removePacketFromList(packetId));
    }
  }

  private removePacketFromList(packetId: number): void {
    const packet = this.packets.filter(p => p.id === packetId);
    let index = this.filteredPackets.indexOf(packet[0]);
    if (index !== -1) {
      this.filteredPackets.splice(index, 1);
    }

    index = this.packets.indexOf(packet[0]);
    if (index !== -1) {
      this.packets.splice(index, 1);
    }
  }

  private getPacketsFromResolver(): void {
    this.route.data
      .pipe(
        map(data => data.packets),
        take(1)
      )
      .subscribe(val => {
        this.packets = val;
        this.filteredPackets = val;
      });
  }
}
