import { Dispatch, memo } from "react";

import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { ICalendar } from "../interfaces/Calendar";
import { ICalenderAction } from "../reducers/calendarReducer";

interface ICalendarsViewProps {
  calendars: ICalendar[];
  checksCalendars: boolean[];
  dispatch: Dispatch<ICalenderAction>;
}

export const CalendarsView = memo(
  ({ dispatch, calendars, checksCalendars }: ICalendarsViewProps) => {
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
                      onChange={() =>
                        dispatch({
                          type: "toggleCalendar",
                          payload: calendarIndex,
                        })
                      }
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
  }
);
