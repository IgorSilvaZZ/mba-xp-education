import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IExpenses } from "../interfaces/IExpenses";

interface FinancesTableProps {
  allExpenses: IExpenses[];
}

export const FinancesTable = ({ allExpenses }: FinancesTableProps) => {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: "300px", width: "100%", background: "transparent" }}
      >
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Despesa</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Valor (R$)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses.map((expense) => (
              <TableRow
                key={expense.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>{expense.descricao}</TableCell>
                <TableCell>{expense.categoria}</TableCell>
                <TableCell>{expense.dia}</TableCell>
                <TableCell>
                  {expense.valor.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
