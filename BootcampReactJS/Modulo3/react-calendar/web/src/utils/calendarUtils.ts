import { ICalendar, IEditingEvent, IEvent } from "../interfaces/Calendar";

export async function getCalendars(): Promise<ICalendar[]> {
  const response = await fetch("http://localhost:8080/calendars");

  const data = await response.json();

  return data;
}

export async function getEvents(from: string, to: string): Promise<IEvent[]> {
  const response = await fetch(
    `http://localhost:8080/events?date_gte${from}&date_lte=${to}&_sort=date,time`
  );

  const data = await response.json();

  return data;
}

export async function createEventCalendar(
  editingEvent: IEditingEvent
): Promise<IEvent[]> {
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(editingEvent),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function updateEventCalendar(
  editingEvent: IEditingEvent
): Promise<IEvent[]> {
  const response = await fetch(
    `http://localhost:8080/events/${editingEvent.id}`,
    {
      method: "PUT",
      body: JSON.stringify(editingEvent),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}

export async function deleteEventCalendar(
  eventCalendarId: number
): Promise<void> {
  await fetch(`http://localhost:8080/events/${eventCalendarId}`, {
    method: "DELETE",
  });
}
