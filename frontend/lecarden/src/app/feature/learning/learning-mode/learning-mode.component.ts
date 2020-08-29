import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { LearningMode } from 'src/app/shared/models/learningMode';
import { Result } from 'src/app/shared/models/result';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PacketState } from '../../word/store/reducers/packets.reducer';
import { PacketPageAction, getPackets } from '../../word/store';
import {
  LearnPageAction,
  ResultPageAction,
  BasketPageAction,
} from '../store/actions';
import { setLearningMode } from '../store/actions/learn-page.actions';
import { getLastResult, getBasketByPacketId } from '../store/';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './learning-mode.component.scss',
  ],
})
export class LearningModeComponent implements OnInit {
  lastResults$: Observable<Result>;
  packets$: Observable<Packet[]>;
  baskets$: Observable<Basket[]>;
  selectedPacket: number;
  selectedLastResultId: number;
  selectedMode: LearningMode;
  isLastResultMode = false;

  constructor(private store: Store<PacketState>) {}

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.store.dispatch(ResultPageAction.loadAllLastResultsForUser());
    this.store.dispatch(BasketPageAction.loadBasketsForUser());
    this.packets$ = this.store.select(getPackets);
  }

  assignSelectedPacket(packetId: number): void {
    this.store.dispatch(LearnPageAction.setLearningPacket({ packetId }));
    this.lastResults$ = this.store.select(getLastResult);
    this.store.dispatch(setLearningMode({ learningMode: null }));
    this.isLastResultMode = false;
    this.selectedPacket = packetId;
    this.selectedLastResultId = null;
    this.selectedMode = null;
    this.store.dispatch(
      LearnPageAction.setLastResultMode({
        isLastResultMode: false,
      })
    );
    this.baskets$ = this.store.select(getBasketByPacketId);
  }

  assignSelectedMode(learningMode: LearningMode): void {
    this.store.dispatch(setLearningMode({ learningMode }));
    this.selectedMode = learningMode;
  }

  selectLastResult(resultId: number): void {
    this.isLastResultMode = !this.isLastResultMode;
    this.store.dispatch(
      LearnPageAction.setLastResultMode({
        isLastResultMode: this.isLastResultMode,
      })
    );
    this.selectedLastResultId = resultId;
  }

  assingBasketModeNumber(basketNumber: number): void {
    this.store.dispatch(BasketPageAction.setBasketModeNumber({ basketNumber }));
  }
}
