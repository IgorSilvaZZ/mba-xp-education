/* eslint-disable @typescript-eslint/no-unused-vars */

import { useParams, useHistory } from "react-router-dom";

import { Box, Grid, MenuItem, Typography } from "@mui/material";

import { NavBar } from "../components/NavBar";
import { SelectInput } from "../components/SelectInput";

import { monthsSelected, yearsSelected } from "../utils/getMonthsYears";

import { NotFoundExpenses } from "../components/NotFoundExpenses";
import { TabsFinances } from "../components/TabsFinance";
import { userExpenses } from "../hooks/useExpenses";
import { useAuth } from "../hooks/useAuth";

interface ParamsHistory {
  year?: string;
  month?: string;
}

export default function Main() {
  const { year, month } = useParams<ParamsHistory>();

  const history = useHistory();

  const { allExpenses, totalExpenses, expensesGroupByCategory } = userExpenses(
    year,
    month
  );

  const { user } = useAuth();

  function handleChangeYear(newYear: string) {
    history.push(`/despesas/${newYear}-${month}`);
  }

  function handleChangeMonth(newMonth: string) {
    history.push(`/despesas/${year}-${newMonth}`);
  }

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
          <Typography variant='h5'>Hey {user.nome} 👋</Typography>
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
              selectValue={year ?? "2020"}
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
              selectValue={month ?? "01"}
              onSelectChange={handleChangeMonth}
            >
              {monthsSelected.map((month, index) => (
                <MenuItem key={index} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </SelectInput>
          </Grid>

          {allExpenses && allExpenses.length > 0 ? (
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
                <TabsFinances
                  allExpenses={allExpenses}
                  expensesGroupByCategory={expensesGroupByCategory}
                />
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
