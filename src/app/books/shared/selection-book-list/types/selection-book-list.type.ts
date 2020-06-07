/**
 * Тип выбираемого элемента для списка книг
 */
export type SelectionBook = {
  id: string;
  title: string;
  selected: boolean;
  description?: string;
  thumbnail?: string;
};
