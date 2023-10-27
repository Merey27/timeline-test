import {EventTypes} from "./info-enum";

export interface Data {
  events: Events[],
  intervalDates: IntervalDates
}

export interface Events {
  dateStart: string,
  dateEnd: string,
  type: EventTypes
}

export interface IntervalDates {
  dateStart: string,
  dateEnd: string,
}
