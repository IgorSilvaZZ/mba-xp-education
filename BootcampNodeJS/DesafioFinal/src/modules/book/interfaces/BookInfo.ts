export interface Evaluations {
  name: string;
  note: number;
  assessment: string;
}

export interface BookInfo {
  bookId: number;
  description: string;
  pages: number;
  publishing: string;
  evaluations: Evaluations[];
}
