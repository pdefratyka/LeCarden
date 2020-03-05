import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';

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
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data
    .pipe(
      map(data => data.packets),
      take(1)
    )
    .subscribe(val => {
      this.packets = val;
    });
  }
}
