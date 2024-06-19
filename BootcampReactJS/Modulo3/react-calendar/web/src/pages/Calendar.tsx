/* eslint-disable @typescript-eslint/no-unused-vars */

import {
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

export default function Calendar() {
  return (
    <>
      <TableContainer component='div' sx={{ height: "100%" }}>
        <StyledTable
          sx={{ minWidth: 650, minHeight: "100%" }}
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
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align='center'>{day}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align='center'>{day}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              {DAYS_OF_WEEK.map((day) => (
                <TableCell align='center'>{day}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </>
  );
}
