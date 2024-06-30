/* eslint-disable no-case-declarations */
import { useParams } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { CalendarsView } from "../components/CalendarsView";
import { CalendarHeader } from "../components/CalendarHeader";
import { CalendarTable } from "../components/CalendarTable";
import { EventFormDialog } from "../components/EventFormDialog";

import { IParamsCalendar } from "../interfaces/Calendar";

import { getToday } from "../utils/dateUtils";

import { useCalendarState } from "../hooks/useCalendarState";

export default function Calendar() {
  const { month } = useParams<IParamsCalendar>();

  /* const [eventsDates, setEventsDate] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [checksCalendars, setChecksCalendars] = useState<boolean[]>([]);

  const [eventEditing, setEventEditing] = useState<IEditingEvent | null>(null); */

  const {
    calendars,
    weeks,
    eventEditing,
    checksCalendars,
    dispatch,
    refreshEventsCalendar,
  } = useCalendarState(month);

  return (
    <>
      <Box display='flex' height='100%' alignItems='stretch'>
        <Box
          borderRight='1px solid rgb(224, 224, 224)'
          width='16em'
          p='8px 16px'
        >
          <h2>React-Calendar</h2>

          <Button
            variant='contained'
            color='primary'
            onClick={() => dispatch({ type: "new", payload: getToday() })}
          >
            Novo Evento
          </Button>

          <CalendarsView
            dispatch={dispatch}
            calendars={calendars}
            checksCalendars={checksCalendars}
          />
        </Box>
        <Box display='flex' flexDirection='column' flex='1'>
          <CalendarHeader month={month} />

          <CalendarTable weeks={weeks} dispatch={dispatch} />

          <EventFormDialog
            eventEditing={eventEditing}
            calendars={calendars}
            onSave={async () => {
              dispatch({ type: "closeDialog", payload: null });
              await refreshEventsCalendar();
            }}
            onCancel={() => dispatch({ type: "closeDialog", payload: null })}
          />
        </Box>
      </Box>
    </>
  );
}
