import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { LearningMode } from 'src/app/shared/models/learningMode';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './learning-mode.component.scss',
  ],
})
export class LearningModeComponent implements OnInit {
  packets: Packet[];
  selectedPacket = -1;
  selectedMode: LearningMode;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.getPacketsFromResolver();
  }

  assignSelectedPacket(packetId: number): void {
    this.selectedPacket = packetId;
  }

  assignSelectedMode(selectedMode: LearningMode): void {
    this.selectedMode = selectedMode;
  }

  private getPacketsFromResolver(): void {
    this.route.data
      .pipe(
        map((data) => data.packets),
        take(1)
      )
      .subscribe((val) => {
        this.packets = val;
      });
  }
}
