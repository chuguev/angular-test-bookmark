/**
 * Список книг
 */
export type BooksList = {
  total: number;
  count: number;
  books: Book[];
};

/**
 * Книга
 */
export type Book = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  favorite: boolean;
  version: string;
};
