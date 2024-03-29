export interface Comentario {
  nome: string;
  conteudo: string;
}

export interface Post {
  titulo: string;
  conteudo: string;
  comentarios: Comentario[];
}
