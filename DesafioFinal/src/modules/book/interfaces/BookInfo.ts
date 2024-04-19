export interface Evaluations {
  name: string;
  note: number;
  assessment: string;
}

export interface BookInfo {
  bookId: number;
  description: string;
  publishing: string;
  evaluations: Evaluations[];
}
