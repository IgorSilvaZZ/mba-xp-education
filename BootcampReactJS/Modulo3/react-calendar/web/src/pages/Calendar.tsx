import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {
  EventWithCalendar,
  ICalendar,
  ICalendarCell,
  IEvent,
  IParamsCalendar,
} from "../interfaces/Calendar";

import { getCalendars, getEvents } from "../utils/calendarUtils";
import { DAYS_OF_WEEK } from "../utils/dateUtils";
import { CalendarsView } from "../components/CalendarsView";
import { CalendarHeader } from "../components/CalendarHeader";
import { CalendarTable } from "../components/CalendarTable";

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  checksCalendars: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];

  const dateToObject = new Date(date + "T12:00:00");
  const currentMonth = dateToObject.getMonth();

  const currentDay = new Date(dateToObject.valueOf());

  currentDay.setDate(1);

  const dayOfWeek = currentDay.getDay();

  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];

    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const year = currentDay.getFullYear();

      const month = String(currentDay.getMonth() + 1).padStart(2, "0");

      const day = String(currentDay.getDate()).padStart(2, "0");

      const isoDate = `${year}-${month}-${day}`;

      const events: EventWithCalendar[] = [];

      for (const eventItem of allEvents) {
        if (eventItem.date === isoDate) {
          const calendarIndex = calendars.findIndex(
            (calendarItem) => calendarItem.id === eventItem.calendarId
          );

          if (checksCalendars[calendarIndex]) {
            events.push({
              ...eventItem,
              calendar: calendars[calendarIndex],
            });
          }
        }
      }

      week.push({
        events,
        date: isoDate,
        dayOfMonth: currentDay.getDate(),
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

export default function Calendar() {
  const { month } = useParams<IParamsCalendar>();

  const [eventsDates, setEventsDate] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [checksCalendars, setChecksCalendars] = useState<boolean[]>([]);

  const weeks = generateCalendar(
    `${month}-01`,
    eventsDates,
    calendars,
    checksCalendars
  );

  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  function toggleCalendarChecked(calendarIndex: number) {
    const newCheckedCalendars = [...checksCalendars];

    newCheckedCalendars[calendarIndex] = !newCheckedCalendars[calendarIndex];

    setChecksCalendars(newCheckedCalendars);
  }

  useEffect(() => {
    (async () => {
      const [calendarsResponse, eventsResponse] = await Promise.all([
        getCalendars(),
        getEvents(firstDate, lastDate),
      ]);

      setCalendars(calendarsResponse);
      setChecksCalendars(calendarsResponse.map(() => true));
      setEventsDate(eventsResponse);
    })();
  }, [firstDate, lastDate]);

  return (
    <>
      <Box display='flex' height='100%' alignItems='stretch'>
        <Box
          borderRight='1px solid rgb(224, 224, 224)'
          width='16em'
          p='8px 16px'
        >
          <h2>React-Calendar</h2>

          <Button variant='contained' color='primary'>
            Novo Evento
          </Button>

          <CalendarsView
            calendars={calendars}
            checksCalendars={checksCalendars}
            toggleCalendarChecked={toggleCalendarChecked}
          />
        </Box>
        <Box display='flex' flexDirection='column' flex='1'>
          <CalendarHeader month={month} />

          <CalendarTable weeks={weeks} />
        </Box>
      </Box>
    </>
  );
}
