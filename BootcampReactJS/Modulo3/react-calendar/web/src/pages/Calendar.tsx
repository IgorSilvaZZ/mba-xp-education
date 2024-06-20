/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Person,
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

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

const StyledTable = styled(Table)<TableProps>(() => ({
  "& td ~ td, & th ~ th": {
    borderLeft: "1px solid rgb(224, 224, 224)",
  },
}));

interface ICalendarCell {
  date: string;
}

function getToday() {
  return "2024-06-20";
}

function generateCalendar(date: string): ICalendarCell[][] {
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

      const isoDate = `${year} - ${month} - ${day}`;

      week.push({ date: isoDate });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

export default function Calendar() {
  const weeks = generateCalendar(getToday());

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

            <FormControlLabel control={<Checkbox />} label='Pessoal' />

            <FormControlLabel control={<Checkbox />} label='Trabalho' />
          </Box>
        </Box>
        <TableContainer component='div'>
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
              Junho de 2024
            </Box>

            <IconButton>
              <Avatar>
                <Person />
              </Avatar>
            </IconButton>
          </Box>
          <StyledTable
            sx={{
              minWidth: 650,
              minHeight: "100%",
              borderTop: "1px solid rgb(224, 224, 224)",
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
                    <TableCell key={cell.date} align='center'>
                      {cell.date}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </Box>
    </>
  );
}
