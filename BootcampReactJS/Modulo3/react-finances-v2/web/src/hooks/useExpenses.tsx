/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { IExpenses, IExpensesGroupByCategory } from "../interfaces/IExpenses";

import { useAuth } from "./useAuth";

import { api } from "../lib/axios";

export const userExpenses = (
  year: string | undefined,
  month: string | undefined
) => {
  const { logout } = useAuth();

  const [allExpenses, setAllExpenses] = useState<IExpenses[] | undefined>([]);
  const [expensesGroupByCategory, setExpensesGroupByCategory] = useState<
    IExpensesGroupByCategory[] | undefined
  >([]);

  const totalExpenses = useMemo(() => {
    const total = allExpenses!.reduce(
      (acc, expenseItem) => acc + expenseItem.valor,
      0
    );

    return total;
  }, [allExpenses]);

  const getExpenses = useCallback(async () => {
    try {
      const { data } = await api.get<IExpenses[]>(`/despesas`, {
        params: {
          mes: `${year}-${month}`,
        },
      });

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
  }, [year, month, logout]);

  useEffect(() => {
    (async () => {
      const expensesYearMonth = await getExpenses();

      setAllExpenses(expensesYearMonth);
    })();
  }, [year, month, getExpenses]);

  return {
    totalExpenses,
    allExpenses,
    expensesGroupByCategory,
  };
};
