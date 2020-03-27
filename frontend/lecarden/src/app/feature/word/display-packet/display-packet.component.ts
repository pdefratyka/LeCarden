import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { FilterService } from 'src/app/core/services/helpers/filter.service';

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
    private readonly filterService: FilterService
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
