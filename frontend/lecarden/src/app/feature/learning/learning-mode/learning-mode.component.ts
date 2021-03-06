import { Component, OnInit } from '@angular/core';
import { Packet } from 'src/app/shared/models/packet';
import { Result } from 'src/app/shared/models/result';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PacketState } from '../../word/store/reducers/packets.reducer';
import {
  PacketPageAction,
  getPacketsByFilters,
  getPacketFilterLanguage,
  getPacketFilterSearch,
} from '../../word/store';
import {
  LearnPageAction,
  ResultPageAction,
  BasketPageAction,
} from '../store/actions';
import { setLearningMode } from '../store/actions/learn-page.actions';
import {
  getLastResult,
  getBasketByPacketId,
  getLearningPacketId,
  isBasketModeSlected,
} from '../store/';
import { Basket } from 'src/app/shared/models/basket';
import { map, take } from 'rxjs/operators';
import { TabPageAction } from '../../store';
import { TabName } from '../../home/models/tabName';
import { PacketFilter } from 'src/app/shared/models/packetFilter';
import { Language } from 'src/app/shared/models/language';
import { LanguageWayLearningMode } from 'src/app/shared/models/languageWayLearningMode';

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
  filterPacketName$: Observable<string>;
  filterPacketLanguage$: Observable<Language>;
  selectedPacket: number;
  selectedLastResultId: number;
  selectedMode: LanguageWayLearningMode;
  isLastResultMode = false;
  isBasketModeSelected$: Observable<boolean>;
  currentPacketId$: Observable<number>;

  constructor(private store: Store<PacketState>) { // There shouldn't be PacketState, what does it even mean?
    this.store.dispatch(TabPageAction.setCurrentTab({ tab: TabName.LEARNING }));
    this.currentPacketId$ = this.store.select(getLearningPacketId);
    this.filterPacketName$ = this.store.select(getPacketFilterSearch);
    this.filterPacketLanguage$ = this.store.select(getPacketFilterLanguage);
    this.isBasketModeSelected$ = this.store.select(isBasketModeSlected);
    this.packets$ = this.store.select(getPacketsByFilters);
    this.baskets$ = this.store.select(getBasketByPacketId).pipe(
      map((b) => {
        return b.sort((x, z) =>
          x.number > z.number ? 1 : z.number > x.number ? -1 : 0
        );
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(PacketPageAction.loadPackets({ query: '' }));
    this.store.dispatch(ResultPageAction.loadAllLastResultsForUser());
    this.store.dispatch(BasketPageAction.loadBasketsForUser());
  }

  assignSelectedPacket(packetId: number): void {
    this.store.dispatch(LearnPageAction.setLearningPacket({ packetId }));
    this.lastResult$ = this.store.select(getLastResult);
    this.store.dispatch(setLearningMode({ languageWayLearningMode: null }));
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

  assignSelectedMode(languageWayLearningMode: LanguageWayLearningMode): void {
    this.store.dispatch(setLearningMode({ languageWayLearningMode }));
    this.selectedMode = languageWayLearningMode;
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
    this.store.dispatch(LearnPageAction.selectBasketMode());
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
    this.currentPacketId$.pipe(take(1)).subscribe((packetId) => {
      this.store.dispatch(PacketPageAction.loadPacketsWords({ packetId }));
    });
  }

  filterPackets(filter: PacketFilter): void {
    this.store.dispatch(
      PacketPageAction.setPacketFilters({
        query: filter.name,
        language: filter.language,
      })
    );
  }
}
