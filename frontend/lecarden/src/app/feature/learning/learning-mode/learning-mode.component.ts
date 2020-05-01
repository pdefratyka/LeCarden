import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  lastResult: Result;
  isLastResultMode = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly resultService: ResultService,
    private readonly tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPacketsFromResolver();
  }

  assignSelectedPacket(packetId: number): void {
    this.selectedPacket = packetId;
    this.getLastResultFromPacket(packetId);
  }

  assignSelectedMode(selectedMode: LearningMode): void {
    this.selectedMode = selectedMode;
  }

  selectLastResult(): void {
    this.isLastResultMode = !this.isLastResultMode;
  }

  startLearning() {
    if (this.isLastResultMode) {
      this.router.navigate([
        `/learn/translation/${this.lastResult.packetId}/result/${this.lastResult.id}`,
        { selectedMode: this.selectedMode },
      ]);
    } else {
      this.router.navigate([
        `/learn/translation/${this.selectedPacket}`,
        { selectedMode: this.selectedMode },
      ]);
    }
  }

  private getLastResultFromPacket(packageId: number): void {
    this.resultService
      .getLastResult(this.tokenService.getUserId(), packageId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.lastResult = response;
        },
        () => {
          this.lastResult = null;
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
