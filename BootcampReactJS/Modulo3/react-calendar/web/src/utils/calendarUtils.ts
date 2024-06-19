import { ICalendar, IEvent } from "../interfaces/Calendar";

export async function getCalendars(): Promise<ICalendar[]> {
  const response = await fetch("http://localhost:8080/calendars");

  const data = await response.json();

  return data;
}

export async function getEvents(): Promise<IEvent[]> {
  const response = await fetch("http://localhost:8080/events");

  const data = await response.json();

  return data;
}
