export type EventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEvent {
  id: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: EventWithCalendar[];
}

export interface IParamsCalendar {
  month: string;
}
