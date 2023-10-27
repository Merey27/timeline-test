import {Injectable} from '@angular/core';
import {Data, Events, IntervalDates} from "./info-model";
import {BehaviorSubject, delay, Observable, of, tap} from "rxjs";
import {EventTypes} from "./info-enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

const DATA: Data = {
  events: [
    {
      dateStart: '2022-01-01T01:00:00',
      dateEnd: '2022-01-01T02:00:00',
      type: EventTypes.CRITICAL,
    },
    {
      dateStart: '2022-01-01T04:00:00',
      dateEnd: '2022-01-01T05:00:00',
      type: EventTypes.NORMAL
    },
    {
      dateStart: '2022-01-01T10:00:00',
      dateEnd: '2022-01-01T24:00:00',
      type: EventTypes.DANGEROUS,
    },
  ],
  intervalDates: {
    dateStart: '2022-01-01T00:00:00',
    dateEnd: '2022-01-01T24:00:00',
  },
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  events: BehaviorSubject<Events[]> = new BehaviorSubject<Events[]>([]);
  eventsObs$ = this.events.asObservable();
  intervalDates: BehaviorSubject<IntervalDates | null> = new BehaviorSubject<IntervalDates | null>(null);

  getData() {
    of(DATA).pipe(
      delay(2000),
      tap(i => this.events.next(i.events)),
      tap(i => this.intervalDates.next(i.intervalDates)),
    )
      .subscribe()
  }


}
