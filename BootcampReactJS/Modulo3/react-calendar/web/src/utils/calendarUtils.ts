import {
  EventWithCalendar,
  ICalendar,
  ICalendarCell,
  IEditingEvent,
  IEvent,
  IUser,
} from "../interfaces/Calendar";
import { DAYS_OF_WEEK } from "./dateUtils";

async function handleResponse(resp: Response) {
  if (resp.ok) {
    return await resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}

export async function getUser(): Promise<IUser> {
  const response = await fetch("http://localhost:8080/auth/user", {
    credentials: "include",
  });

  const data = await handleResponse(response);

  return data;
}

export async function login(email: string, password: string): Promise<IUser> {
  const response = await fetch("http://localhost:8080/auth/login", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await handleResponse(response);

  return data;
}

export async function logout(): Promise<void> {
  const response = await fetch("http://localhost:8080/auth/logout", {
    credentials: "include",
    method: "POST",
  });

  const data = await handleResponse(response);

  return data;
}

export async function getCalendars(): Promise<ICalendar[]> {
  const response = await fetch("http://localhost:8080/calendars", {
    credentials: "include",
  });

  const data = await handleResponse(response);

  return data;
}

export async function getEvents(from: string, to: string): Promise<IEvent[]> {
  const response = await fetch(
    `http://localhost:8080/events?date_gte${from}&date_lte=${to}&_sort=date,time`,
    { credentials: "include" }
  );

  const data = await handleResponse(response);

  return data;
}

export async function createEventCalendar(
  editingEvent: IEditingEvent
): Promise<IEvent[]> {
  const response = await fetch("http://localhost:8080/events", {
    credentials: "include",
    method: "POST",
    body: JSON.stringify(editingEvent),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await handleResponse(response);

  return data;
}

export async function updateEventCalendar(
  editingEvent: IEditingEvent
): Promise<IEvent[]> {
  const response = await fetch(
    `http://localhost:8080/events/${editingEvent.id}`,
    {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(editingEvent),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await handleResponse(response);

  return data;
}

export async function deleteEventCalendar(
  eventCalendarId: number
): Promise<void> {
  await fetch(`http://localhost:8080/events/${eventCalendarId}`, {
    credentials: "include",
    method: "DELETE",
  });
}

export function generateCalendar(
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
