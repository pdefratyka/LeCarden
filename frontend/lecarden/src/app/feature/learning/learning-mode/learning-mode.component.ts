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
import { map } from 'rxjs/operators';
import { TabPageAction } from '../../store';
import { TabName } from '../../home/models/tabName';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: [
    './../../../shared/styles/global.scss',
    './learning-mode.component.scss',
  ],
})
export class LearningModeComponent implements OnInit {
  lastResult$: Observable<Result>;
  packets$: Observable<Packet[]>;
  baskets$: Observable<Basket[]>;
  selectedPacket: number;
  selectedLastResultId: number;
  selectedMode: LearningMode;
  isLastResultMode = false;
  isBasketModeSelected = false;

  constructor(private store: Store<PacketState>) {
    this.store.dispatch(TabPageAction.setCurrentTab({ tab: TabName.LEARNING }));
    this.packets$ = this.store.select(getPackets);
  }

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.store.dispatch(ResultPageAction.loadAllLastResultsForUser());
    this.store.dispatch(BasketPageAction.loadBasketsForUser());
  }

  assignSelectedPacket(packetId: number): void {
    this.store.dispatch(LearnPageAction.setLearningPacket({ packetId }));
    this.lastResult$ = this.store.select(getLastResult);
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
    this.store.dispatch(BasketPageAction.setBasketModeNumber({ basket: null }));
    this.baskets$ = this.store.select(getBasketByPacketId).pipe(
      map((b) => {
        return b.sort((x, z) =>
          x.number > z.number ? 1 : z.number > x.number ? -1 : 0
        );
      })
    );
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

  assingBasketModeNumber(basket: Basket): void {
    this.store.dispatch(BasketPageAction.setBasketModeNumber({ basket }));
  }

  selectBasketMode(): void {
    this.isBasketModeSelected = !this.isBasketModeSelected;
  }

  resetBaskets(): void {
    if (
      window.confirm('Are you sure you want to reset baskets for this packet?')
    ) {
      this.store.dispatch(
        BasketPageAction.resetBaskets({ packetId: this.selectedPacket })
      );
    }
  }

  learn(): void {
    this.store.dispatch(
      PacketPageAction.loadPacketsWords({ packetId: this.selectedPacket })
    );
  }
}
