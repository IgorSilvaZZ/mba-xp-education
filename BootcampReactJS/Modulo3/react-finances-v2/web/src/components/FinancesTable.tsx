import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import { IExpenses } from "../interfaces/IExpenses";

import { CustomCellTable } from "./CustomCellTable";
import { CustomTableContainer } from "./CustomTableContainer";

interface FinancesTableProps {
  allExpenses: IExpenses[];
}

export const FinancesTable = ({ allExpenses }: FinancesTableProps) => {
  return (
    <>
      <CustomTableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <CustomCellTable>Despesa</CustomCellTable>
              <CustomCellTable>Categoria</CustomCellTable>
              <CustomCellTable>Dia</CustomCellTable>
              <CustomCellTable>Valor (R$)</CustomCellTable>
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
                <CustomCellTable>{expense.descricao}</CustomCellTable>
                <CustomCellTable>{expense.categoria}</CustomCellTable>
                <CustomCellTable>{expense.dia}</CustomCellTable>
                <CustomCellTable>
                  {expense.valor.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </CustomCellTable>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </>
  );
};
