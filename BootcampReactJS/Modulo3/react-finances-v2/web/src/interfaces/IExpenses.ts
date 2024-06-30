export interface IExpenses {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IExpensesGroupByCategory {
  categoria: string;
  total: number;
}