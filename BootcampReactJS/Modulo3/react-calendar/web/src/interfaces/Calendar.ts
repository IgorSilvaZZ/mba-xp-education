export type EventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: EventWithCalendar[];
}

export interface IParamsCalendar {
  month: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ICalendarState {
  calendars: ICalendar[];
  checksCalendars: boolean[];
  eventsDates: IEvent[];
  eventEditing: IEditingEvent | null;
}
