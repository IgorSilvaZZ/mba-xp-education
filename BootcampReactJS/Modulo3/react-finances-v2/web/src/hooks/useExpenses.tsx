/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { IExpenses, IExpensesGroupByCategory } from "../interfaces/IExpenses";

import { useAuth } from "./useAuth";

import { api } from "../lib/axios";

export const userExpenses = (
  year: string | undefined,
  month: string | undefined
) => {
  const { logout } = useAuth();

  const [yearSelected, setYearSelected] = useState<string>(year ?? "2020");
  const [monthSelected, setMonthSelected] = useState<string>(month ?? "01");
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const [allExpenses, setAllExpenses] = useState<IExpenses[] | undefined>([]);
  const [expensesGroupByCategory, setExpensesGroupByCategory] = useState<
    IExpensesGroupByCategory[] | undefined
  >([]);

  async function getExpenses(yearFilter: string, monthFilter: string) {
    try {
      const { data } = await api.get<IExpenses[]>(`/despesas`, {
        params: {
          mes: `${yearFilter}-${monthFilter}`,
        },
      });

      const expensesTotal = data.reduce(
        (acc, expenseItem) => acc + expenseItem.valor,
        0
      );

      const sortableDayExpenses = data.sort(
        (a, b) => Number(a.dia) - Number(b.dia)
      );

      const groupByCategory: IExpensesGroupByCategory[] = [];

      sortableDayExpenses.map((expenseItem) => {
        const alreadyExpenseGroup = groupByCategory.find(
          (item) => item.categoria === expenseItem.categoria
        );

        if (alreadyExpenseGroup) {
          alreadyExpenseGroup.total += expenseItem.valor;
        } else {
          groupByCategory.push({
            categoria: expenseItem.categoria,
            total: expenseItem.valor,
          });
        }
      });

      setExpensesGroupByCategory(
        groupByCategory.sort((a, b) => b.total - a.total)
      );

      setTotalExpenses(expensesTotal);

      return sortableDayExpenses;
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.status &&
          error.response.status === 401
        ) {
          logout();
        }
      }
    }
  }

  useEffect(() => {
    (async () => {
      const expensesYearMonth = await getExpenses(
        year ?? yearSelected,
        month ?? monthSelected
      );

      setAllExpenses(expensesYearMonth);
    })();
  }, []);

  return {
    yearSelected,
    monthSelected,
    totalExpenses,
    allExpenses,
    expensesGroupByCategory,
    setAllExpenses,
    setYearSelected,
    setMonthSelected,
    getExpenses,
  };
};
