/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";

import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Person,
  WatchLater,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
  styled,
} from "@mui/material";
import { ICalendar, IEvent } from "../interfaces/Calendar";

import { getCalendars, getEvents } from "../utils/calendarUtils";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const StyledTable = styled(Table)<TableProps>(() => ({
  "& td ~ td, & th ~ th": {
    borderLeft: "1px solid rgb(224, 224, 224)",
  },
  "& td": {
    verticalAlign: "top",
    overflow: "hidden",
    padding: "8px 4px",
  },
}));

type EventWithCalendar = IEvent & { calendar: ICalendar };

interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: EventWithCalendar[];
}

function getToday() {
  return "2021-06-17";
}

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
  const [eventsDates, setEventsDate] = useState<IEvent[]>([]);
  const [calendars, setCalendars] = useState<ICalendar[]>([]);
  const [checksCalendars, setChecksCalendars] = useState<boolean[]>([]);

  const weeks = generateCalendar(
    getToday(),
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

          <Box mt='64px'>
            <h3>Agendas</h3>

            {calendars.map((calendarItem, calendarIndex) => (
              <>
                <div key={calendarItem.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: calendarItem.color }}
                        checked={checksCalendars[calendarIndex]}
                        onChange={() => toggleCalendarChecked(calendarIndex)}
                      />
                    }
                    label={calendarItem.name}
                  />
                </div>
              </>
            ))}
          </Box>
        </Box>
        <Box display='flex' flexDirection='column' flex='1'>
          <Box display='flex' alignItems='center' p='8px 16px'>
            <Box>
              <IconButton aria-label='Mês Anterior'>
                <ChevronLeftOutlined />
              </IconButton>

              <IconButton aria-label='Proxímo Mês'>
                <ChevronRightOutlined />
              </IconButton>
            </Box>
            <Box flex='1' component='h3' ml='16px'>
              Junho de 2021
            </Box>

            <IconButton>
              <Avatar>
                <Person />
              </Avatar>
            </IconButton>
          </Box>
          <TableContainer sx={{ flex: "1" }} component='div'>
            <StyledTable
              sx={{
                minWidth: 650,
                minHeight: "100%",
                borderTop: "1px solid rgb(224, 224, 224)",
                tableLayout: "fixed",
              }}
              aria-label='simple table'
            >
              <TableHead>
                <TableRow>
                  {DAYS_OF_WEEK.map((day) => (
                    <TableCell align='center'>{day}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {weeks.map((week, index) => (
                  <TableRow key={index}>
                    {week.map((cell) => (
                      <TableCell key={cell.dayOfMonth} align='center'>
                        <Box
                          sx={{
                            fontWeight: "500",
                            marginBottom: "4px",
                          }}
                          component='div'
                        >
                          {cell.dayOfMonth}
                        </Box>

                        {cell.events.map((eventItem, indexEvent) => {
                          const colorCalendar = eventItem.calendar.color;

                          return (
                            <>
                              <button
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  whiteSpace: "nowrap",
                                  margin: "4px 0",
                                }}
                                key={indexEvent}
                              >
                                {eventItem.time && (
                                  <>
                                    <WatchLater
                                      htmlColor={colorCalendar}
                                      fontSize='inherit'
                                    />

                                    <Box component='span' m='4px'>
                                      {eventItem.time}
                                    </Box>
                                  </>
                                )}

                                {eventItem.time ? (
                                  <span>{eventItem.desc}</span>
                                ) : (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      backgroundColor: colorCalendar,
                                      color: "white",
                                      padding: "2px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {eventItem.desc}
                                  </span>
                                )}
                              </button>
                            </>
                          );
                        })}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
