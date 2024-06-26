import { MouseEvent } from "react";

import { WatchLater } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
  styled,
} from "@mui/material";
import { ICalendarCell, IEvent } from "../interfaces/Calendar";
import { DAYS_OF_WEEK } from "../utils/dateUtils";

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

interface ICalendarTableProps {
  weeks: ICalendarCell[][];
  onClickDay: (dateSelected: string) => void;
  onClickEvent: (event: IEvent) => void;
}

export const CalendarTable = ({
  weeks,
  onClickDay,
  onClickEvent,
}: ICalendarTableProps) => {
  function handleClick(event: MouseEvent, dateSelected: string) {
    /* Verificação de verificar se é uma area vazia do elemento */
    if (event.target === event.currentTarget) {
      console.log("handleClick foi chamado!");
      onClickDay(dateSelected);
    }
  }

  return (
    <>
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
                  <TableCell
                    key={cell.dayOfMonth}
                    align='center'
                    onClick={(eventMouse) => handleClick(eventMouse, cell.date)}
                  >
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
                            key={indexEvent}
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
                            type='button'
                            onClick={() => onClickEvent(eventItem)}
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
    </>
  );
};
