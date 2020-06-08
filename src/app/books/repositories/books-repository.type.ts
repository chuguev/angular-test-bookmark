/**
 * Ответ от сервера со списком книг
 */
export type BooksListResponse = {
  kind: string;
  totalItems: number;
  items: BookResponse[];
};

/**
 * Ответ от сервера с книгой
 */
export type BookResponse = {
  kind: string;
  id: string;
  etag: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    infoLink: string;
  };
};
