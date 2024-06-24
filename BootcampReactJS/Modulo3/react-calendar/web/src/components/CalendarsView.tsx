import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { ICalendar } from "../interfaces/Calendar";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  checksCalendars: boolean[];
  toggleCalendarChecked: (calendarIndex: number) => void;
}

export const CalendarsView = ({
  calendars,
  checksCalendars,
  toggleCalendarChecked,
}: ICalendarsViewProps) => {
  return (
    <>
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
    </>
  );
};
