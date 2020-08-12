import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { take } from 'rxjs/operators';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Result } from 'src/app/shared/models/result';
import { ResultService } from 'src/app/core/services/api/result.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PacketState } from '../../word/store/reducers/packets.reducer';
import { PacketPageAction, getPackets } from '../../word/store';
import { LearnPageAction, ResultPageAction } from '../store/actions';
import { setLearningMode } from '../store/actions/learn-page.actions';
import { getLastResult } from '../store/';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './learning-mode.component.scss',
  ],
})
export class LearningModeComponent implements OnInit {
  selectedPacket: number;
  selectedMode: LearningMode;
  lastResults$: Observable<Result[]>;
  selectedLastResult: Result;
  isLastResultMode = false;
  packets$: Observable<Packet[]>;

  constructor(
    private readonly resultService: ResultService,
    private store: Store<PacketState>
  ) {}

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.packets$ = this.store.select(getPackets);
  }

  assignSelectedPacket(packetId: number): void {
    this.store.dispatch(LearnPageAction.setLearningPacket({ packetId }));
    this.store.dispatch(ResultPageAction.getLastResultFromPacket({ packetId }));
    this.lastResults$ = this.store.select(getLastResult);
    this.selectedPacket = packetId;
    //this.getLastResultFromPacket(packetId);
    this.selectedLastResult = null;
    this.selectedMode = null;
  }

  assignSelectedMode(learningMode: LearningMode): void {
    this.store.dispatch(setLearningMode({ learningMode }));
    this.selectedMode = learningMode;
    let mode;
    if (this.selectedMode === 0) {
      mode = 'FOREGIN_TO_KNOWN';
    } else if (this.selectedMode === 1) {
      mode = 'KNOWN_TO_FOREGIN';
    }
    /*const res = this.lastResults.filter(
      (r) => r.learningMode.toString() === mode
    );
    if (res.length > 0) {
      this.selectedLastResult = res[0];
    } else {
      this.selectedLastResult = null;
    }*/
  }

  selectLastResult(): void {
    this.isLastResultMode = !this.isLastResultMode;
  }

  /*private getLastResultFromPacket(packageId: number): void {
    this.resultService
      .getLastResult(packageId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.lastResults = response;
        },
        () => {
          this.lastResults = null;
        }
      );
  }*/
}
