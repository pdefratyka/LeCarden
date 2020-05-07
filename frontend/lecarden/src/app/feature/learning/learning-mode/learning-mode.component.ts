import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packet } from 'src/app/shared/models/packet';
import { map, take } from 'rxjs/operators';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Result } from 'src/app/shared/models/result';
import { ResultService } from 'src/app/core/services/api/result.service';
import { TokenService } from 'src/app/core/services/security/token.service';

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
  selectedPacket: number;
  selectedMode: LearningMode;
  lastResults: Result[];
  selectedLastResult: Result;
  isLastResultMode = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly tokenService: TokenService
  ) {}

  ngOnInit() {
    this.getPacketsFromResolver();
  }

  assignSelectedPacket(packetId: number): void {
    this.selectedPacket = packetId;
    this.getLastResultFromPacket(packetId);
    this.selectedLastResult = null;
    this.selectedMode = null;
  }

  assignSelectedMode(selectedMode: LearningMode): void {
    this.selectedMode = selectedMode;
    let mode;
    if (this.selectedMode === 0) {
      mode = 'FOREGIN_TO_KNOWN';
    } else if (this.selectedMode === 1) {
      mode = 'KNOWN_TO_FOREGIN';
    }
    const res = this.lastResults.filter(
      (r) => r.learningMode.toString() === mode
    );
    if (res.length > 0) {
      this.selectedLastResult = res[0];
    } else {
      this.selectedLastResult = null;
    }
  }

  selectLastResult(): void {
    this.isLastResultMode = !this.isLastResultMode;
  }

  private getLastResultFromPacket(packageId: number): void {
    this.resultService
      .getLastResult(this.tokenService.getUserId(), packageId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.lastResults = response;
        },
        () => {
          this.lastResults = null;
        }
      );
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
