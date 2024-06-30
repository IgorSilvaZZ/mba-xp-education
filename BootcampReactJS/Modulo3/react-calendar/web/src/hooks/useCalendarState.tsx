import { useEffect, useMemo, useReducer } from "react";

import {
  generateCalendar,
  getCalendars,
  getEvents,
} from "../utils/calendarUtils";
import { calendarReducer } from "../reducers/calendarReducer";

export const useCalendarState = (month: string) => {
  const [state, dispatch] = useReducer(calendarReducer, {
    calendars: [],
    checksCalendars: [],
    eventsDates: [],
    eventEditing: null,
  });

  const { eventsDates, calendars, checksCalendars, eventEditing } = state;

  async function refreshEventsCalendar() {
    const responseEvents = await getEvents(firstDate, lastDate);
    dispatch({ type: "load", payload: { eventsDates: responseEvents } });
  }

  const weeks = useMemo(() => {
    return generateCalendar(
      `${month}-01`,
      eventsDates,
      calendars,
      checksCalendars
    );
  }, [month, eventsDates, calendars, checksCalendars]);

  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    (async () => {
      const [calendarsResponse, eventsResponse] = await Promise.all([
        getCalendars(),
        getEvents(firstDate, lastDate),
      ]);

      dispatch({
        type: "load",
        payload: { calendars: calendarsResponse, eventsDates: eventsResponse },
      });
    })();
  }, [firstDate, lastDate]);

  return {
    weeks,
    calendars,
    eventEditing,
    checksCalendars,
    refreshEventsCalendar,
    dispatch,
  };
};
