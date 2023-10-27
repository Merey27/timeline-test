import {Component, OnInit} from '@angular/core';
import {InfoService} from "./info.service";
import {Events} from "./info-model";
import {Observable} from "rxjs";
import {EventTypes} from "./info-enum";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public eventList: Observable<Events[] | []> | undefined
  public timeLineStart: string | undefined = '';
  public timeLineEnd: string | undefined = '';

  constructor(public infoService: InfoService) {
  }

  ngOnInit() {
    this.infoService.getData();
    this.eventList = this.infoService.eventsObs$;
    this.infoService.intervalDates
      .subscribe(i => {
        this.timeLineStart = i?.dateStart
        this.timeLineEnd = i?.dateEnd
      });
  }

  getTimelinePeriod() {
    const dateStart = this.timeLineStart;
    const dateEnd = this.timeLineEnd;
    return new Date(dateEnd as string).getTime() - new Date(dateStart as string).getTime();
  }

  getEventPeriod(item: Events) {
    const start = item.dateStart;
    const end = item.dateEnd;
    const convertedStart = new Date(start).getTime();
    const convertedEnd = new Date(end).getTime();
    return convertedEnd - convertedStart
  }

  getWidth(item: Events) {
    return this.getEventPeriod(item) / this.getTimelinePeriod() * this.getWidthTimeline();
  }

  getLeft(item: Events) {
    const start = item.dateStart;
    const dateEnd = this.timeLineEnd;
    const differenceToTimeline = new Date(dateEnd as string).getTime() - new Date(start).getTime()
    return this.getWidthTimeline() - ((differenceToTimeline) * this.getWidthTimeline() / this.getTimelinePeriod());
  }

  getWidthTimeline() {
    const oneDay = 86400000; //in milliseconds
    return this.getTimelinePeriod() / oneDay * 1000
  }

  getTooltipText(item: Events) {
    return `Start: ${item.dateStart}, end: ${item.dateEnd}, type: ${EventTypes[item.type]}`;
  }

  getColor(item: Events) {
    switch (item.type) {
      case EventTypes.NORMAL:
        return 'green'
      case EventTypes.CRITICAL:
        return 'red'
      case EventTypes.DANGEROUS:
        return 'yellow'
    }
  }
}
