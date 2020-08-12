import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Result } from 'src/app/shared/models/result';
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
  selectedLastResultId: number;
  isLastResultMode = false; // TODO the logic of displaying some components should not be here.
  packets$: Observable<Packet[]>;

  constructor(private store: Store<PacketState>) {}

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.packets$ = this.store.select(getPackets);
  }

  assignSelectedPacket(packetId: number): void {
    this.store.dispatch(LearnPageAction.setLearningPacket({ packetId }));
    this.store.dispatch(ResultPageAction.getLastResultFromPacket({ packetId }));
    this.lastResults$ = this.store.select(getLastResult);
    this.selectedPacket = packetId;
    this.selectedLastResultId = null;
    this.selectedMode = null;
  }

  assignSelectedMode(learningMode: LearningMode): void {
    this.store.dispatch(setLearningMode({ learningMode }));
    this.selectedMode = learningMode;
  }

  selectLastResult(resultId: number): void {
    this.isLastResultMode = !this.isLastResultMode;
    this.selectedLastResultId = resultId;
  }
}
