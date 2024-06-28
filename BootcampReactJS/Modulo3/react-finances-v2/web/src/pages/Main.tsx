/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";

import { NavBar } from "../components/NavBar";
import { SelectInput } from "../components/SelectInput";

import { monthsSelected, yearsSelected } from "../utils/getMonthsYears";

import { api } from "../lib/axios";

import { IExpenses } from "../interfaces/IExpenses";

import { NotFoundExpenses } from "../components/NotFoundExpenses";
import { TabsFinances } from "../components/TabsFinance";

interface ParamsHistory {
  year?: string;
  month?: string;
}

export default function Main() {
  const { year, month } = useParams<ParamsHistory>();

  const history = useHistory();

  const [yearSelected, setYearSelected] = useState<string>(year ?? "2020");
  const [monthSelected, setMonthSelected] = useState<string>(month ?? "01");
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const [allExpenses, setAllExpenses] = useState<IExpenses[]>([]);

  async function handleSubmit() {
    history.push(`/despesas/${yearSelected}-${monthSelected}`);

    const expenses = await getExpenses(
      year ?? yearSelected,
      month ?? monthSelected
    );

    setAllExpenses(expenses);
  }

  function handleChangeYear(newYear: string) {
    setYearSelected(newYear);
  }

  function handleChangeMonth(newMonth: string) {
    setMonthSelected(newMonth);
  }

  async function getExpenses(yearFilter: string, monthFilter: string) {
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

    setTotalExpenses(expensesTotal);

    return sortableDayExpenses;
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

  return (
    <Grid container sx={{ height: "100vh", width: "100vw" }}>
      <NavBar />

      <Grid
        container
        xs
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          display='flex'
          sx={{ height: "90%", width: "60%" }}
          flexDirection='column'
          color='white'
          gap={2}
        >
          <Typography variant='h5'>Hey Igor 👋</Typography>
          <Typography variant='subtitle2'>
            Selecione o ano e mês para verificar suas despesas 💸
          </Typography>

          <Grid
            item
            display='flex'
            alignItems='center'
            color='white'
            mt='25px'
            gap={3}
          >
            <SelectInput
              label='Ano'
              selectValue={yearSelected}
              onSelectChange={handleChangeYear}
            >
              {yearsSelected.map((year, index) => (
                <MenuItem key={index} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </SelectInput>

            <SelectInput
              label='Mês'
              selectValue={monthSelected}
              onSelectChange={handleChangeMonth}
            >
              {monthsSelected.map((month, index) => (
                <MenuItem key={index} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </SelectInput>

            <Button
              variant='contained'
              sx={{ backgroundColor: "rgb(124 58 237)", borderRadius: "15px" }}
              onClick={handleSubmit}
            >
              Pesquisar
            </Button>
          </Grid>

          {allExpenses.length > 0 ? (
            <>
              <Grid item display='flex' alignItems='center' height='50px'>
                <Typography>
                  Total das Despesas:{" "}
                  <strong style={{ color: "rgb(139 92 246)" }}>
                    {totalExpenses.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </Typography>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "10px",
                  mt: "12px",
                }}
              >
                <TabsFinances allExpenses={allExpenses} />
              </Box>
            </>
          ) : (
            <NotFoundExpenses />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
