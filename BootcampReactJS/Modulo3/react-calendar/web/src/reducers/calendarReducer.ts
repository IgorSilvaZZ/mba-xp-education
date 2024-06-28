/* eslint-disable no-case-declarations */

import { ICalendar, ICalendarState, IEvent } from "../interfaces/Calendar";

export type ICalenderAction =
  | {
      type: "load";
      payload: { eventsDates: IEvent[]; calendars?: ICalendar[] };
    }
  | {
      type: "new";
      payload: string;
    }
  | {
      type: "edit";
      payload: IEvent;
    }
  | {
      type: "closeDialog";
      payload: null;
    }
  | {
      type: "toggleCalendar";
      payload: number;
    };

export function calendarReducer(
  state: ICalendarState,
  { type, payload }: ICalenderAction
) {
  switch (type) {
    case "load":
      const calendars = payload.calendars ?? state.calendars;

      return {
        ...state,
        calendars,
        eventsDates: payload.eventsDates,
        checksCalendars: calendars.map(() => true),
      };
    case "edit":
      return { ...state, eventEditing: payload };
    case "new":
      return {
        ...state,
        eventEditing: {
          date: payload,
          desc: "",
          calendarId: state.calendars[0].id,
        },
      };
    case "closeDialog":
      return { ...state, eventEditing: null };
    case "toggleCalendar":
      const newCheckedCalendars = [...state.checksCalendars];

      newCheckedCalendars[payload] = !newCheckedCalendars[payload];

      return { ...state, checksCalendars: newCheckedCalendars };
    default:
      return state;
  }
}
