import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const DetailsFinance = () => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "300px", width: "100%", background: "transparent" }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Alimentação</TableCell>
              <TableCell>R$ 1936,10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alimentação</TableCell>
              <TableCell>R$ 1936,10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alimentação</TableCell>
              <TableCell>R$ 1936,10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Alimentação</TableCell>
              <TableCell>R$ 1936,10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
