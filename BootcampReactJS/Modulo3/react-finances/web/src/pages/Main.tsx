/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { NavBar } from "../components/NavBar";
import { SelectInput } from "../components/SelectInput";

import { monthsSelected, yearsSelected } from "../utils/getMonthsYears";

import { api } from "../lib/axios";

interface ParamsHistory {
  year?: string;
  month?: string;
}

interface IExpenses {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export default function Main() {
  /* const { year, month } = useParams<ParamsHistory>(); */

  const history = useHistory();

  const [yearSelected, setYearSelected] = useState<string>("2020");
  const [monthSelected, setMonthSelected] = useState<string>("01");

  function handleSubmit() {
    history.push(`/despesas/${yearSelected}-${monthSelected}`);
  }

  async function getExpenses(yearFilter: string, monthFilter: string) {
    const { data } = await api.get(`/despesas`, {
      params: {
        mes: `${yearFilter}-${monthFilter}`,
      },
    });

    return data;
  }

  useEffect(() => {
    (async () => {
      const expensesYearMonth = await getExpenses(yearSelected, monthSelected);

      console.log(expensesYearMonth);
    })();
  }, [yearSelected, monthSelected]);

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
            <SelectInput label='Ano' selectValue={yearSelected}>
              {yearsSelected.map((year, index) => (
                <MenuItem key={index} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </SelectInput>

            <SelectInput label='Mês' selectValue={monthSelected}>
              {monthsSelected.map((month, index) => (
                <MenuItem key={index} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </SelectInput>

            <Button
              variant='contained'
              sx={{ backgroundColor: "#9b59b6", borderRadius: "15px" }}
            >
              Pesquisar
            </Button>
          </Grid>

          <Grid item display='flex' alignItems='center' height='50px'>
            <Typography>
              Total das Despesas:{" "}
              <strong style={{ color: "rgb(139 92 246)" }}>R$ 500,00</strong>
            </Typography>
          </Grid>

          <Box
            sx={{
              display: "flex",
              borderRadius: "10px",
              mt: "12px",
            }}
          >
            <TableContainer component={Paper} sx={{ height: "100%" }}>
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
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Restaurante</TableCell>
                    <TableCell>Alimentacao</TableCell>
                    <TableCell>01</TableCell>
                    <TableCell>38,25</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
