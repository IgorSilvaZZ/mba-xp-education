import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import { CustomTableContainer } from "./CustomTableContainer";
import { CustomCellTable } from "./CustomCellTable";

import { IExpensesGroupByCategory } from "../interfaces/IExpenses";

interface DetailsFinanceProps {
  expensesGroupByCategory: IExpensesGroupByCategory[] | undefined;
}

export const DetailsFinance = ({
  expensesGroupByCategory,
}: DetailsFinanceProps) => {
  return (
    <>
      <CustomTableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <CustomCellTable>Categoria</CustomCellTable>
              <CustomCellTable>Valor (R$)</CustomCellTable>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesGroupByCategory!.map((expenseItem) => (
              <TableRow>
                <CustomCellTable>{expenseItem.categoria}</CustomCellTable>
                <CustomCellTable>
                  {expenseItem.total.toLocaleString("pt-br", {
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
