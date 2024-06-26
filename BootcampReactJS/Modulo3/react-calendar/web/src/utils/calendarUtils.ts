import {
  ICalendar,
  IEditingEvent,
  IEvent,
  IUser,
} from "../interfaces/Calendar";

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
