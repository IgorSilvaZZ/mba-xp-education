import { IPointsMatch } from "./IPointsMatch";

export interface IMatch {
  visitante: string;
  resultado: string;
  data_partida: string;
  placar_visitante: number;
  hora_partida: string;
  mandante: string;
  placar_mandante: number;
  estadio: string;
  pontuacao_geral_mandante: IPointsMatch;
  pontuacao_geral_visitante: IPointsMatch;
}

export interface IMatches {
  numero: number;
  partidas: IMatch[];
}
